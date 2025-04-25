-- Create warehouses table if it doesn't exist
CREATE TABLE IF NOT EXISTS warehouses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location TEXT NOT NULL,
  subsidiary_company_id UUID REFERENCES subsidiary_companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public access" ON warehouses;
CREATE POLICY "Public access"
ON warehouses FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Auth users can insert" ON warehouses;
CREATE POLICY "Auth users can insert"
ON warehouses FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Auth users can update" ON warehouses;
CREATE POLICY "Auth users can update"
ON warehouses FOR UPDATE
USING (true);

DROP POLICY IF EXISTS "Auth users can delete" ON warehouses;
CREATE POLICY "Auth users can delete"
ON warehouses FOR DELETE
USING (true);

-- Enable realtime
alter publication supabase_realtime add table warehouses;
