-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    contact_info TEXT NOT NULL,
    address TEXT,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (read-only)
DROP POLICY IF EXISTS "Public access" ON suppliers;
CREATE POLICY "Public access"
    ON suppliers FOR SELECT
    USING (true);

-- Create policy for authenticated users (full access)
DROP POLICY IF EXISTS "Authenticated users can manage suppliers" ON suppliers;
CREATE POLICY "Authenticated users can manage suppliers"
    ON suppliers FOR ALL
    USING (auth.role() = 'authenticated');

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE suppliers;