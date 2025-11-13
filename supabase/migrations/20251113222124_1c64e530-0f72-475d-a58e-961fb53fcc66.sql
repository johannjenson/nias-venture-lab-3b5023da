-- Create partnership applications table
CREATE TABLE IF NOT EXISTS public.partnership_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_type TEXT NOT NULL CHECK (application_type IN ('company', 'fund')),
  
  -- Common fields
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  additional_info TEXT,
  
  -- Company-specific fields
  company_name TEXT,
  revenue_usd TEXT,
  profit_margin TEXT,
  growth_rate TEXT,
  geographic_footprint TEXT,
  gulf_expansion_plans TEXT,
  strategic_metric_type TEXT,
  strategic_metric_value TEXT,
  
  -- Fund-specific fields
  fund_aum_vintage TEXT,
  investment_strategy TEXT,
  historical_performance TEXT,
  gulf_strategy TEXT,
  partnership_type TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.partnership_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can submit partnership applications"
ON public.partnership_applications
FOR INSERT
WITH CHECK (true);

-- Create policy for reading (admin only - adjust as needed)
CREATE POLICY "Authenticated users can view applications"
ON public.partnership_applications
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_partnership_applications_updated_at
BEFORE UPDATE ON public.partnership_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_partnership_applications_type ON public.partnership_applications(application_type);
CREATE INDEX idx_partnership_applications_status ON public.partnership_applications(application_type, status);
CREATE INDEX idx_partnership_applications_created ON public.partnership_applications(created_at DESC);