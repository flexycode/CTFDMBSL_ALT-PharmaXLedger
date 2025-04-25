// Script to auto-sync mockMedicines from MedicineCatalog.tsx into a SQL migration file
// Usage: node scripts/generate-medicine-sql.cjs
const fs = require('fs');
const path = require('path');

const tsxFile = path.join(__dirname, '../src/components/MedicineCatalog.tsx');
const sqlFile = path.join(__dirname, '../supabase/migrations/20240416000001_update_medicines_table.sql');

function extractMedicines(tsxContent) {
  // Extract mockMedicines array
  const match = tsxContent.match(/const mockMedicines: Medicine\[\] = (\[[\s\S]*?\]);/);
  if (!match) throw new Error('mockMedicines array not found');
  let arrStr = match[1]
    .replace(/(\w+):/g, '"$1":')
    .replace(/'/g, '"')
    .replace(/,\s*([}\]])/g, '$1');
  // Remove trailing commas for JSON.parse
  return JSON.parse(arrStr);
}

function sqlString(str) {
  return str == null ? 'NULL' : `'${String(str).replace(/'/g, "''")}'`;
}

function generateSql(medicines) {
  const values = medicines.map(med =>
    `(${[
      sqlString(med.name),
      sqlString(med.description),
      med.price,
      sqlString(med.category),
      sqlString(med.manufacturer),
      med.inStock,
      sqlString(med.imageUrl),
      sqlString(med.dosage || ''),
      sqlString(med.form || ''),
      sqlString(med.origin || 'Philippines')
    ].join(', ')})`
  );
  return `TRUNCATE TABLE medicines;\nINSERT INTO medicines (name, description, price, category, manufacturer, in_stock, image_url, dosage, form, origin) VALUES\n${values.join(',\n')};\n`;
}

const tsxContent = fs.readFileSync(tsxFile, 'utf8');
const medicines = extractMedicines(tsxContent);
const sql = generateSql(medicines);
fs.writeFileSync(sqlFile, sql);
console.log('Migration file updated!');
