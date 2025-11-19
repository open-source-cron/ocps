// --- Markdown Template ---
const markdownTemplate = `
# OCPS Implementation Conformance

**Status: DRAFT**

## 1. Introduction

This document tracks the conformance of various scheduling libraries, daemons, and standards against the different versions of the Open Cron Pattern Specification (OCPS). The goal is to provide a clear overview for developers seeking a tool that meets their specific scheduling needs.

An implementation may not support all features of a specific OCPS version. The tables below aim to capture that nuance.

## 2. Conformance Matrix

**Legend:**
{{LEGEND}}

### Adoption Summary

This table shows the percentage of the {{LIBRARY_COUNT}} libraries listed below that meet different levels of conformance.

{{ADOPTION_SUMMARY}}
{{TABLES}}

## References

{{REFERENCES}}

---
*This document is automatically generated from [data/conformance.json](./data/conformance.json) on {{GENERATION_DATE}}.*

*This table is based on analysis of official documentation and community knowledge. For the most accurate details, please refer to the documentation of the respective libraries.*
`;


// --- Type Definitions ---
type ComplianceLevel = 'full' | 'partial' | 'none' | 'na';

interface Compliance {
  [version: string]: ComplianceLevel;
}

interface Item {
  name: string;
  compliance: Compliance;
  notes: string;
  references?: number[];
}

interface Category {
  name: string;
  items: Item[];
}

interface Reference {
  id: number;
  url: string;
}

interface LegendEntry {
    symbol: string;
    name: string;
    description: string;
}

interface ConformanceData {
  legend: { [key: string]: LegendEntry };
  categories: Category[];
  references: Reference[];
}

// --- Main Generation Function ---
async function generateConformanceReport() {
  try {
    // 1. Read and parse the JSON data
    console.log('Reading conformance.json...');
    const jsonText = await Deno.readTextFile('../data/conformance.json');
    
    let data: ConformanceData;
    try {
      data = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse conformance.json:', parseError);
      Deno.exit(1);
    }

    // Validate data structure
    if (!data.legend || !data.categories || !data.references) {
      console.error('Invalid conformance.json structure: missing required fields');
      Deno.exit(1);
    }

    const versions = getVersions(data);
    const libraries = getLibraries(data);
    const usedReferenceIds = getUsedReferenceIds(data);

    console.log(`Found ${versions.length} versions and ${libraries.length} libraries`);

    // 2. Generate dynamic parts of the Markdown
    console.log('Generating report sections...');
    const legend = generateLegend(data.legend);
    const adoptionSummary = generateAdoptionSummary(versions, libraries);
    const tables = generateAllTables(data.categories, versions, data.legend);
    const references = generateReferenceTable(data.references, usedReferenceIds);
    const generationDate = new Date().toISOString().split('T')[0];

    // 3. Inject dynamic parts into the template
    let md = markdownTemplate
      .replace('{{LEGEND}}', legend)
      .replace('{{LIBRARY_COUNT}}', libraries.length.toString())
      .replace('{{ADOPTION_SUMMARY}}', adoptionSummary)
      .replace('{{TABLES}}', tables)
      .replace('{{REFERENCES}}', references)
      .replace('{{GENERATION_DATE}}', generationDate)
      .trim();

    // 4. Write the output file
    console.log('Writing CONFORMANCE.md...');
    await Deno.writeTextFile('../CONFORMANCE.md', md);
    console.log('✓ Successfully generated CONFORMANCE.md');

  } catch (error) {
    console.error('Error generating conformance report:', error);
    Deno.exit(1);
  }
}

// --- Helper Functions ---

function getVersions(data: ConformanceData): string[] {
    if (data.categories.length > 0 && data.categories[0].items.length > 0) {
        return Object.keys(data.categories[0].items[0].compliance);
    }
    return [];
}

function getLibraries(data: ConformanceData): Item[] {
    return data.categories
        .filter(cat => cat.name !== "Specifications" && cat.name !== "System Cron Daemons")
        .flatMap(cat => cat.items);
}

function getUsedReferenceIds(data: ConformanceData): Set<number> {
    const ids = new Set<number>();
    data.categories.forEach(cat => {
        cat.items.forEach(item => {
            if (item.references) {
                item.references.forEach(id => ids.add(id));
            }
        });
    });
    return ids;
}

function generateLegend(legendData: { [key: string]: LegendEntry }): string {
    let legendMd = '';
    for (const key in legendData) {
        const entry = legendData[key as keyof typeof legendData];
        legendMd += `* ${entry.symbol} **${entry.name}:** ${entry.description}\n`;
    }
    return legendMd;
}

function generateAdoptionSummary(versions: string[], libraries: Item[]): string {
    const totalLibs = libraries.length;

    const fullFeatureAdoption = { name: 'Full Feature Adoption', rates: {} as { [v: string]: string } };
    const anyFeatureAdoption = { name: 'Any Feature Adoption', rates: {} as { [v: string]: string } };
    const anyConformance = { name: 'Any Conformance (Cumulative)', rates: {} as { [v: string]: string } };
    const fullConformance = { name: 'Full Conformance (Cumulative)', rates: {} as { [v: string]: string } };

    for (const [i, version] of versions.entries()) {
        let fullFeatureCount = 0;
        let anyFeatureCount = 0;
        let anyCount = 0;
        let fullCount = 0;

        for (const lib of libraries) {
            // Feature Adoption: Does it support this version's specific features?
            if (lib.compliance[version] === 'full') {
                fullFeatureCount++;
            }
            if (lib.compliance[version] === 'full' || lib.compliance[version] === 'partial') {
                anyFeatureCount++;
            }

            // Cumulative Conformance Check
            let isFullyCompliantSoFar = true;
            for (let j = 0; j < i; j++) { // Check all previous versions
                if (lib.compliance[versions[j]] !== 'full') {
                    isFullyCompliantSoFar = false;
                    break;
                }
            }

            if (isFullyCompliantSoFar) {
                // Any Conformance: Is it fully compliant up to now, AND at least partially compliant with this version?
                if (lib.compliance[version] === 'full' || lib.compliance[version] === 'partial') {
                    anyCount++;
                }
                // Full Conformance: Is it fully compliant up to now, AND fully compliant with this version?
                if (lib.compliance[version] === 'full') {
                    fullCount++;
                }
            }
        }
        
        fullFeatureAdoption.rates[version] = `${totalLibs > 0 ? Math.round((fullFeatureCount / totalLibs) * 100) : 0}%`;
        anyFeatureAdoption.rates[version] = `${totalLibs > 0 ? Math.round((anyFeatureCount / totalLibs) * 100) : 0}%`;
        anyConformance.rates[version] = `${totalLibs > 0 ? Math.round((anyCount / totalLibs) * 100) : 0}%`;
        fullConformance.rates[version] = `${totalLibs > 0 ? Math.round((fullCount / totalLibs) * 100) : 0}%`;
    }
    
    const headers = `| **Conformance Level** | ${versions.map(v => `**OCPS ${v}**`).join(' | ')} |`;
    const separators = `| :--- | ${versions.map(() => ':---:').join(' | ')} |`;
    
    const row1 = `| ${anyFeatureAdoption.name} | ${versions.map(v => `**${anyFeatureAdoption.rates[v]}**`).join(' | ')} |`;
    const row2 = `| ${fullFeatureAdoption.name} | ${versions.map(v => `**${fullFeatureAdoption.rates[v]}**`).join(' | ')} |`;
    const row3 = `| ${anyConformance.name} | ${versions.map(v => `**${anyConformance.rates[v]}**`).join(' | ')} |`;
    const row4 = `| ${fullConformance.name} | ${versions.map(v => `**${fullConformance.rates[v]}**`).join(' | ')} |`;

    return `${headers}\n${separators}\n${row1}\n${row2}\n${row3}\n${row4}\n`;
}

function generateCategoryTable(category: Category, versions: string[], legend: { [key: string]: LegendEntry }): string {
    const header = `| **${category.name}** | ${versions.map(v => `**OCPS ${v}**`).join(' | ')} | **Notes** |`;
    const separator = `| :--- | ${versions.map(() => ':---:').join(' | ')} | :--- |`;

    const rows = category.items.map(item => {
        const complianceCells = versions.map(v => legend[item.compliance[v] as keyof typeof legend]?.symbol || '❓').join(' | ');
        const referenceLinks = (item.references || []).map(id => `[${id}]`).join('');
        const notes = `${item.notes || ''} ${referenceLinks}`.trim();
        return `| **${item.name}** | ${complianceCells} | ${notes} |`;
    }).join('\n');

    return `${header}\n${separator}\n${rows}\n`;
}

function generateAllTables(categories: Category[], versions: string[], legend: { [key: string]: LegendEntry }): string {
    return categories
        .map(category => `### ${category.name}\n\n${generateCategoryTable(category, versions, legend)}`)
        .join('\n');
}

function generateReferenceTable(references: Reference[], usedIds: Set<number>): string {
    const header = `| **Reference** | **URL** |`;
    const separator = `| :--- | :--- |`;
    const rows = references
        .filter(ref => usedIds.has(ref.id))
        .map(ref => `| ${ref.id} | <${ref.url}> |`).join('\n');
    return `${header}\n${separator}\n${rows}\n`;
}

// --- Run Script ---
generateConformanceReport();
