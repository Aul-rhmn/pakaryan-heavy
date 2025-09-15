-- Update Supabase auth settings to disable email confirmation for easier testing
-- This should be run in the Supabase SQL editor or via API

-- Allow users to sign up without email confirmation
UPDATE auth.users SET email_confirmed_at = NOW() WHERE email_confirmed_at IS NULL;

-- Add payment status to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'pending';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_reference VARCHAR(100);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_due_date TIMESTAMP WITH TIME ZONE;

-- Update existing bookings
UPDATE bookings SET payment_status = 'pending', payment_due_date = created_at + INTERVAL '24 hours' WHERE payment_status IS NULL;
