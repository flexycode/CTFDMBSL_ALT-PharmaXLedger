-- Add payment_details column to orders table if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'payment_details'
    ) THEN
        ALTER TABLE orders ADD COLUMN payment_details jsonb;
    END IF;
END $$;

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
