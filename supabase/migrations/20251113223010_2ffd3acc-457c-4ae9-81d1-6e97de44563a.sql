-- Add advisor-specific fields to partnership_applications table
ALTER TABLE public.partnership_applications
ADD COLUMN IF NOT EXISTS advisor_name TEXT,
ADD COLUMN IF NOT EXISTS advisor_role TEXT,
ADD COLUMN IF NOT EXISTS opportunity_description TEXT,
ADD COLUMN IF NOT EXISTS relationship_type TEXT,
ADD COLUMN IF NOT EXISTS gulf_relevance TEXT,
ADD COLUMN IF NOT EXISTS opportunity_type TEXT,
ADD COLUMN IF NOT EXISTS company_revenue_band TEXT,
ADD COLUMN IF NOT EXISTS company_footprint TEXT,
ADD COLUMN IF NOT EXISTS fund_aum_band TEXT,
ADD COLUMN IF NOT EXISTS fund_sector_focus TEXT,
ADD COLUMN IF NOT EXISTS partnership_engagement_type TEXT,
ADD COLUMN IF NOT EXISTS partnership_engagement_details TEXT;

-- Update the check constraint to include 'advisor' type
ALTER TABLE public.partnership_applications 
DROP CONSTRAINT IF EXISTS partnership_applications_application_type_check;

ALTER TABLE public.partnership_applications
ADD CONSTRAINT partnership_applications_application_type_check 
CHECK (application_type IN ('company', 'fund', 'advisor'));