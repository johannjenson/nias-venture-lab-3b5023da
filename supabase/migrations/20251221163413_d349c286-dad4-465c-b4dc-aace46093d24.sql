-- Add proper contact fields to partnership_applications table
ALTER TABLE public.partnership_applications
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS role_title TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_partnership_applications_email ON public.partnership_applications(email);

-- Add index on application_type for filtering
CREATE INDEX IF NOT EXISTS idx_partnership_applications_type ON public.partnership_applications(application_type);