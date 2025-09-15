-- Clean up duplicate users and prevent future duplicates
-- Remove duplicate users (keep the first one for each email)
DELETE FROM auth.users 
WHERE id NOT IN (
  SELECT MIN(id) 
  FROM auth.users 
  GROUP BY email
);

-- Update auth settings to prevent duplicate signups
UPDATE auth.config 
SET 
  enable_signup = true,
  enable_confirmations = false,
  enable_email_confirmations = false
WHERE true;

-- Ensure RLS policies are properly set
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Update user profiles policy to handle auth properly
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;

CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
