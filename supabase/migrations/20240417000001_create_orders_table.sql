-- Create orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total DECIMAL(10, 2) NOT NULL,
  items INTEGER,
  company TEXT,
  parent_company_id UUID,
  subsidiary_company_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy for full access
DROP POLICY IF EXISTS "Allow full access to orders" ON orders;
CREATE POLICY "Allow full access to orders"
  ON orders
  USING (true)
  WITH CHECK (true);

-- Enable realtime
alter publication supabase_realtime add table orders;