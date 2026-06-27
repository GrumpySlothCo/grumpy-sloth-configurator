/**
 * Builds keyboard definitions for Grumpy Sloth keyboards only.
 * Reads source definitions from /keyboards/, compiles them using @the-via/reader,
 * and writes the output to /public/definitions/.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const shouldForceBuild = args.includes('--fresh') || args.includes('-f');
const positionalArgs = args.filter((a) => !a.startsWith('-'));
const outputDir = positionalArgs[0] || './public/definitions';

if (!shouldForceBuild && fs.existsSync(outputDir)) {
  console.log('Definitions already built. Pass --fresh to rebuild.');
  process.exit(0);
}

const {
  keyboardDefinitionV3ToVIADefinitionV3,
  getVendorProductId,
} = require('@the-via/reader');

const v2Dir = path.join(outputDir, 'v2');
const v3Dir = path.join(outputDir, 'v3');
fs.mkdirSync(v2Dir, {recursive: true});
fs.mkdirSync(v3Dir, {recursive: true});

const keyboardsDir = path.resolve('./keyboards');
const sourceFiles = fs
  .readdirSync(keyboardsDir)
  .filter((f) => f.endsWith('.json'));

const v3Ids = [];
const names = [];

for (const file of sourceFiles) {
  const filePath = path.join(keyboardsDir, file);
  const definition = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  try {
    const compiled = keyboardDefinitionV3ToVIADefinitionV3(definition);
    const id = getVendorProductId(definition);
    v3Ids.push(id);
    names.push(definition.name);

    const outPath = path.join(v3Dir, `${id}.json`);
    fs.writeFileSync(outPath, JSON.stringify(compiled));
    console.log(`Generated ${outPath}`);
  } catch (e) {
    console.error(`Failed to process ${file}: ${e.message}`);
    process.exit(1);
  }
}

const supportedKbs = {
  generatedAt: Date.now(),
  version: '0.1.0',
  vendorProductIds: {v2: [], v3: v3Ids},
};
fs.writeFileSync(
  path.join(outputDir, 'supported_kbs.json'),
  JSON.stringify(supportedKbs, null, 2),
);
fs.writeFileSync(
  path.join(outputDir, 'keyboard_names.json'),
  JSON.stringify(names),
);
fs.writeFileSync(
  path.join(outputDir, 'hash.json'),
  JSON.stringify(Date.now().toString(16)),
);

console.log(`Generated ${path.join(outputDir, 'supported_kbs.json')}`);
console.log(`Generated ${path.join(outputDir, 'keyboard_names.json')}`);
console.log(`Generated ${path.join(outputDir, 'hash.json')}`);
