-- Change items column in orders table to jsonb to store cart item array
-- Safely change items column to jsonb for cart items array
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'items'
    ) THEN
        ALTER TABLE orders DROP COLUMN items;
    END IF;
END $$;
ALTER TABLE orders ADD COLUMN items jsonb;

-- Optionally, add payment_method if not present
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'payment_method'
    ) THEN
        ALTER TABLE orders ADD COLUMN payment_method text;
    END IF;
END $$;
