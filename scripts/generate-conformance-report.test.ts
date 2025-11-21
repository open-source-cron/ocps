// Simple test suite for conformance data validation
// No external dependencies required

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertExists(value: any, message: string): void {
  assert(value !== null && value !== undefined, message);
}

Deno.test("conformance.json exists and is valid JSON", async () => {
  const jsonText = await Deno.readTextFile('./data/conformance.json');
  const data = JSON.parse(jsonText);
  
  assertExists(data.legend, "legend should exist");
  assertExists(data.categories, "categories should exist");
  assertExists(data.references, "references should exist");
  
  console.log("✓ conformance.json is valid JSON with required top-level fields");
});

Deno.test("all categories have required fields", async () => {
  const jsonText = await Deno.readTextFile('./data/conformance.json');
  const data = JSON.parse(jsonText);
  
  for (const category of data.categories) {
    assertExists(category.name, `Category missing name`);
    assertExists(category.items, `Category ${category.name} missing items`);
    assert(Array.isArray(category.items), `Category ${category.name} items is not an array`);
  }
  
  console.log(`✓ All ${data.categories.length} categories have required fields`);
});

Deno.test("all items have compliance data", async () => {
  const jsonText = await Deno.readTextFile('./data/conformance.json');
  const data = JSON.parse(jsonText);
  
  let itemCount = 0;
  for (const category of data.categories) {
    for (const item of category.items) {
      assertExists(item.name, `Item in ${category.name} missing name`);
      assertExists(item.compliance, `Item ${item.name} missing compliance`);
      assertExists(item.notes, `Item ${item.name} missing notes`);
      itemCount++;
    }
  }
  
  console.log(`✓ All ${itemCount} items have required fields (name, compliance, notes)`);
});

Deno.test("conformance generation creates output file", async () => {
  // Import and run the generation function
  const originalCwd = Deno.cwd();
  
  try {
    // Change to scripts directory as the script expects to run from there
    Deno.chdir('./scripts');
    
    // Run the generation
    const command = new Deno.Command("deno", {
      args: ["run", "-A", "generate-conformance-report.ts"],
      stdout: "piped",
      stderr: "piped",
    });
    
    const { code, stdout, stderr } = await command.output();
    
    const output = new TextDecoder().decode(stdout);
    const errors = new TextDecoder().decode(stderr);
    
    assert(code === 0, `Generation failed with errors: ${errors}`);
    assert(output.includes("Successfully generated CONFORMANCE.md"), "Success message not found in output");
    
    // Verify the file was created
    const stats = await Deno.stat("../CONFORMANCE.md");
    assert(stats.isFile, "CONFORMANCE.md was not created");
    
    console.log("✓ Conformance report generation successful");
  } finally {
    Deno.chdir(originalCwd);
  }
});
