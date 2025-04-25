// This script checks for missing or mismatched medicine images in the mockMedicines array
const fs = require('fs');
const path = require('path');

const tsxFile = path.join(__dirname, '../src/components/MedicineCatalog.tsx');
const assetsDir = path.join(__dirname, '../src/assets/medicines');

function extractMedicines(tsxContent) {
  const match = tsxContent.match(/const mockMedicines: Medicine\[\] = (\[[\s\S]*?\]);/);
  if (!match) throw new Error('mockMedicines array not found');
  let arrStr = match[1]
    .replace(/(\w+):/g, '"$1":')
    .replace(/'/g, '"')
    .replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(arrStr);
}

function main() {
  const tsxContent = fs.readFileSync(tsxFile, 'utf8');
  const medicines = extractMedicines(tsxContent);
  const assetFiles = fs.readdirSync(assetsDir);

  let missingImages = [];
  let foundImages = [];

  medicines.forEach(med => {
    const imgName = med.imageUrl.replace('/src/assets/medicines/', '');
    if (!assetFiles.includes(imgName)) {
      missingImages.push({ name: med.name, imageUrl: med.imageUrl });
    } else {
      foundImages.push({ name: med.name, imageUrl: med.imageUrl });
    }
  });

  if (missingImages.length === 0) {
    console.log('✅ All medicine images are present!');
  } else {
    console.log('❌ The following medicines are missing images:');
    missingImages.forEach(med => {
      console.log(`- ${med.name}: ${med.imageUrl}`);
    });
  }
}

main();
