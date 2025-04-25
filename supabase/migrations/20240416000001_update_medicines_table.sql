TRUNCATE TABLE medicines;
INSERT INTO medicines (name, description, price, category, manufacturer, in_stock, image_url, dosage, form, origin) VALUES
('Ambroxol', 'Expectorant used to treat respiratory diseases with excessive mucus', 120.5, 'respiratory', 'TGP Pharma Inc.', true, '/src/assets/medicines/ambroxol.jpg', '', '', 'Philippines'),
('Amlodipine', 'Calcium channel blocker used to treat high blood pressure and coronary artery disease', 350.75, 'cardiovascular', 'Sandoz Pharmaceuticals', true, '/src/assets/medicines/amlodipine.png', '', '', 'Philippines'),
('Asmagone (Salbutamol Sulfate)', 'Bronchodilator that relaxes muscles in the airways, used to treat asthma', 420, 'respiratory', 'TGP Pharma Inc.', true, '/src/assets/medicines/asmagone-salbutamol-sulfate.jpg', '', '', 'Philippines'),
('Benedex (Amoxicillin)', 'Antibiotic used to treat bacterial infections', 650, 'antibiotics', 'TGP Pharma Inc.', true, '/src/assets/medicines/benedex-amoxicillin.jpg', '', '', 'Philippines'),
('Butamirate Citrate', 'Antitussive medication used to relieve cough', 180.25, 'respiratory', 'Actimed Pharmaceuticals', true, '/src/assets/medicines/butamirate-citrate.jpg', '', '', 'Philippines'),
('Butamirate Citrate Tablet', 'Antitussive medication used to relieve cough', 195.5, 'respiratory', 'Actimed Pharmaceuticals', true, '/src/assets/medicines/butamirate-citrate-tablet.jpg', '', '', 'Philippines'),
('Cepham (Cefalexin)', 'Antibiotic used to treat bacterial infections', 520.75, 'antibiotics', 'TGP Pharma Inc.', true, '/src/assets/medicines/cepham-cefalexin-cap.jpg', '', '', 'Philippines'),
('Dextro (Dextromethorphan)', 'Cough suppressant used to treat cough caused by the common cold or flu', 220.5, 'respiratory', 'TGP Pharma Inc.', true, '/src/assets/medicines/dextro-dextromethorphan-tablet.jpg', '', '', 'Philippines'),
('Guaiflem (Guaifenesin)', 'Expectorant used to reduce chest congestion caused by colds or infections', 180.75, 'respiratory', 'TGP Pharma Inc.', true, '/src/assets/medicines/guaiflem-guaifenesin.jpg', '', '', 'Philippines'),
('LemonCee (Ascorbic Acid)', 'Vitamin C supplement used to prevent and treat scurvy', 85.75, 'vitamins', 'TGP Pharma Inc.', true, '/src/assets/medicines/lemoncee-ascorbic-acid-drops.jpg', '', '', 'Philippines');
