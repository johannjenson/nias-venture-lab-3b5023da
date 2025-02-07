
import { IndustryType } from './types.ts';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Keywords that suggest an industry
export const industryKeywords: Record<IndustryType, string[]> = {
  manufacturing: ['factory', 'manufacturing', 'production', 'industrial', 'assembly'],
  technology: ['software', 'tech', 'digital', 'it', 'cyber', 'ai', 'cloud', 'saas'],
  tourism: ['travel', 'tourism', 'hospitality', 'hotel', 'airline'],
  healthcare: ['health', 'medical', 'pharma', 'biotech', 'hospital'],
  energy: ['energy', 'power', 'renewable', 'solar', 'wind', 'oil', 'gas'],
  mining: ['mining', 'minerals', 'metals', 'extraction'],
  logistics: ['logistics', 'transport', 'shipping', 'supply chain'],
  education: ['education', 'school', 'university', 'training', 'learning'],
  finance: ['bank', 'finance', 'investment', 'insurance', 'fintech'],
  real_estate: ['real estate', 'property', 'construction', 'development'],
  agriculture: ['agriculture', 'farming', 'food', 'agritech'],
  water: ['water', 'desalination', 'utilities'],
  defense: ['defense', 'security', 'military', 'aerospace'],
  sports: ['sports', 'fitness', 'entertainment'],
  aerospace: ['aerospace', 'aviation', 'space'],
  retail: ['retail', 'commerce', 'shop', 'store', 'ecommerce'],
  creative: ['media', 'design', 'art', 'creative', 'entertainment'],
  biotech: ['biotech', 'life sciences', 'research'],
  construction: ['construction', 'building', 'infrastructure'],
  ocean: ['marine', 'ocean', 'maritime', 'shipping']
};

// Map Clearbit categories to our industry types
export const clearbitToIndustryMap: Record<string, IndustryType> = {
  'Software': 'technology',
  'Hardware': 'technology',
  'Information Technology': 'technology',
  'Financial Services': 'finance',
  'Banking': 'finance',
  'Insurance': 'finance',
  'Healthcare': 'healthcare',
  'Manufacturing': 'manufacturing',
  'Transportation': 'logistics',
  'Education': 'education',
  'Real Estate': 'real_estate',
  'Agriculture': 'agriculture',
  'Energy': 'energy',
  'Mining': 'mining',
  'Defense': 'defense',
  'Aerospace': 'aerospace',
  'Retail': 'retail',
  'Media': 'creative',
  'Entertainment': 'creative',
  'Biotechnology': 'biotech',
  'Construction': 'construction',
  'Maritime': 'ocean'
};
