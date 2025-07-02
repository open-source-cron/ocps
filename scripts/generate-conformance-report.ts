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

This table shows the percentage of the {{LIBRARY_COUNT}} libraries listed below that are at least partially compliant with each OCPS version.

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
    const jsonText = await Deno.readTextFile('../data/conformance.json');
    const data: ConformanceData = JSON.parse(jsonText);

    const versions = getVersions(data);
    const libraries = getLibraries(data);
    const usedReferenceIds = getUsedReferenceIds(data);

    // 2. Generate dynamic parts of the Markdown
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
    await Deno.writeTextFile('../CONFORMANCE.md', md);
    console.log('Successfully generated CONFORMANCE.md');

  } catch (error) {
    console.error('Error generating conformance report:', error);
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
    const adoptionRates: { [version: string]: string } = {};

    for (const version of versions) {
        const compliantCount = libraries.filter(lib => 
            lib.compliance[version] === 'full' || lib.compliance[version] === 'partial'
        ).length;
        const percentage = totalLibs > 0 ? Math.round((compliantCount / totalLibs) * 100) : 0;
        adoptionRates[version] = `${percentage}%`;
    }
    
    const headers = versions.map(v => `**OCPS ${v}**`).join(' | ');
    const separators = versions.map(() => ':---:').join(' | ');
    const values = versions.map(v => `**${adoptionRates[v]}**`).join(' | ');

    return `| ${headers} |\n| ${separators} |\n| ${values} |\n`;
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
