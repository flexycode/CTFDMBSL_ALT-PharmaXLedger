-- Create medicines table
CREATE TABLE IF NOT EXISTS medicines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  manufacturer VARCHAR(255),
  in_stock BOOLEAN DEFAULT true,
  image_url TEXT,
  dosage VARCHAR(100),
  form VARCHAR(100),
  origin VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
DROP POLICY IF EXISTS "Public medicines access" ON medicines;
CREATE POLICY "Public medicines access"
ON medicines FOR SELECT
USING (true);

-- Enable realtime
alter publication supabase_realtime add table medicines;

-- Insert sample medicines based on the provided images
INSERT INTO medicines (name, description, price, category, manufacturer, in_stock, image_url, dosage, form, origin) VALUES
('Amoxicillin', 'Antibiotic used to treat bacterial infections', 650.00, 'antibiotics', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj9VVLB/amoxicillin.jpg', '500mg', 'Capsule', 'Philippines'),
('Paracetamol', 'Analgesic and antipyretic used for pain relief and fever reduction', 120.50, 'painkillers', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj4Lnzw/paracetamol.jpg', '500mg', 'Tablet', 'Philippines'),
('Amlodipine', 'Calcium channel blocker used to treat high blood pressure and coronary artery disease', 350.75, 'cardiovascular', 'Sandoz Pharmaceuticals', true, 'https://i.ibb.co/Jj4Lnzw/amlodipine.jpg', '5mg', 'Tablet', 'Philippines'),
('Salbutamol', 'Bronchodilator that relaxes muscles in the airways, used to treat asthma', 420.00, 'respiratory', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj4Lnzw/salbutamol.jpg', '2.5mg/2.5ml', 'Nebules', 'Philippines'),
('Butamirate Citrate', 'Antitussive medication used to relieve cough', 180.25, 'respiratory', 'Actimed Pharmaceuticals', true, 'https://i.ibb.co/Jj4Lnzw/butamirate.jpg', '50mg', 'Tablet', 'Philippines'),
('Metformin', 'Oral diabetes medicine that helps control blood sugar levels', 250.00, 'endocrine', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj4Lnzw/metformin.jpg', '500mg', 'Tablet', 'Philippines'),
('Losartan Potassium', 'Angiotensin II receptor blocker used to treat high blood pressure', 380.50, 'cardiovascular', 'RiteMED Phils. Inc.', true, 'https://i.ibb.co/Jj4Lnzw/losartan.jpg', '50mg', 'Tablet', 'Philippines'),
('Cefalexin', 'Antibiotic used to treat bacterial infections', 520.75, 'antibiotics', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj4Lnzw/cefalexin.jpg', '500mg', 'Capsule', 'Philippines'),
('Mefenamic Acid', 'Non-steroidal anti-inflammatory drug used for pain relief', 150.00, 'painkillers', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj4Lnzw/mefenamic.jpg', '250mg', 'Capsule', 'Philippines'),
('Azithromycin', 'Macrolide antibiotic used to treat bacterial infections', 480.25, 'antibiotics', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj4Lnzw/azithromycin.jpg', '500mg', 'Tablet', 'Philippines'),
('Dextromethorphan', 'Cough suppressant used to treat cough caused by the common cold or flu', 220.50, 'respiratory', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj4Lnzw/dextromethorphan.jpg', '10mg', 'Tablet', 'Philippines'),
('Ascorbic Acid', 'Vitamin C supplement used to prevent and treat scurvy', 85.75, 'vitamins', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj4Lnzw/ascorbic.jpg', '100mg/ml', 'Syrup', 'Philippines'),
('Acetylcysteine', 'Mucolytic agent used to treat conditions with thick mucus', 320.00, 'respiratory', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj4Lnzw/acetylcysteine.jpg', '600mg', 'Powder', 'Philippines'),
('Carbocisteine', 'Mucolytic agent used to reduce phlegm and thin mucus', 280.25, 'respiratory', 'Actimed Pharmaceuticals', true, 'https://i.ibb.co/Jj4Lnzw/carbocisteine.jpg', '500mg', 'Capsule', 'Philippines'),
('Trimetazidine', 'Anti-angina medication used to treat chest pain', 420.50, 'cardiovascular', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj4Lnzw/trimetazidine.jpg', '35mg', 'Tablet', 'Philippines'),
('Guaifenesin', 'Expectorant used to reduce chest congestion caused by colds or infections', 180.75, 'respiratory', 'TGP Pharma Inc.', true, 'https://i.ibb.co/Jj4Lnzw/guaifenesin.jpg', '100mg/5ml', 'Syrup', 'Philippines');