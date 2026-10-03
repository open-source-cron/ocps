# Instructions for AI assistants and contributors

- Full specifications in `/specifications` are immutable except for numbered Revisions that only clarify behavior. Later versions must stay strict supersets of earlier ones.
- When changing a rule in a published spec, apply the same change to every later full spec in the same PR, and add a Revision row to each affected spec's history ("Includes OCPS X.Y revision N" for derived specs).
- Update matching vectors in `data/conformance-tests.json` (schema: `data/conformance-tests.schema.json`), the Revision column in `README.md`, and regenerate `CONFORMANCE.md` (`cd scripts && deno run -A generate-conformance-report.ts`) if `data/conformance.json` changes.
- Keep changes surgical and minimal.
