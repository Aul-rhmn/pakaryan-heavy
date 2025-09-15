-- Fix authentication settings to allow sign up without email confirmation
UPDATE auth.config 
SET 
  enable_signup = true,
  enable_confirmations = false,
  email_confirm_changes = false
WHERE true;

-- Ensure RLS policies allow user creation
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

-- Create new policies
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow service role to insert profiles (for the trigger)
CREATE POLICY "Service role can insert profiles" ON public.user_profiles
  FOR INSERT WITH CHECK (true);
