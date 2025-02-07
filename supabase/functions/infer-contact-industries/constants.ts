
import { IndustryType } from './types.ts';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Keywords that suggest an industry
export const industryKeywords: Record<IndustryType, string[]> = {
  manufacturing: ['factory', 'manufacturing', 'production', 'industrial', 'assembly', 'fabrication', 'plant', 'machinery', 'equipment', 'processing'],
  technology: ['software', 'tech', 'digital', 'it', 'cyber', 'ai', 'cloud', 'saas', 'platform', 'automation', 'data', 'analytics', 'iot', 'robotics'],
  tourism: ['travel', 'tourism', 'hospitality', 'hotel', 'airline', 'resort', 'destination', 'leisure', 'vacation', 'entertainment'],
  healthcare: ['health', 'medical', 'pharma', 'biotech', 'hospital', 'clinic', 'patient', 'care', 'wellness', 'diagnostic'],
  energy: ['energy', 'power', 'renewable', 'solar', 'wind', 'oil', 'gas', 'electricity', 'utilities', 'sustainable'],
  mining: ['mining', 'minerals', 'metals', 'extraction', 'resources', 'ore', 'exploration', 'drilling', 'quarry'],
  logistics: ['logistics', 'transport', 'shipping', 'supply chain', 'freight', 'warehouse', 'distribution', 'cargo', 'fleet'],
  education: ['education', 'school', 'university', 'training', 'learning', 'academic', 'teaching', 'college', 'institute'],
  finance: ['bank', 'finance', 'investment', 'insurance', 'fintech', 'trading', 'wealth', 'asset', 'capital', 'financial'],
  real_estate: ['real estate', 'property', 'construction', 'development', 'housing', 'commercial', 'residential', 'leasing'],
  agriculture: ['agriculture', 'farming', 'food', 'agritech', 'crop', 'livestock', 'organic', 'sustainable farming'],
  water: ['water', 'desalination', 'utilities', 'irrigation', 'treatment', 'conservation', 'marine', 'aqua'],
  defense: ['defense', 'security', 'military', 'aerospace', 'protection', 'surveillance', 'cybersecurity'],
  sports: ['sports', 'fitness', 'entertainment', 'athletic', 'recreation', 'stadium', 'league', 'team'],
  aerospace: ['aerospace', 'aviation', 'space', 'aircraft', 'satellite', 'defense', 'aeronautical', 'navigation'],
  retail: ['retail', 'commerce', 'shop', 'store', 'ecommerce', 'merchant', 'consumer', 'sales', 'marketplace'],
  creative: ['media', 'design', 'art', 'creative', 'entertainment', 'studio', 'agency', 'content', 'digital media'],
  biotech: ['biotech', 'life sciences', 'research', 'pharmaceutical', 'laboratory', 'clinical', 'molecular'],
  construction: ['construction', 'building', 'infrastructure', 'engineering', 'architecture', 'contractor', 'development'],
  ocean: ['marine', 'ocean', 'maritime', 'shipping', 'port', 'naval', 'offshore', 'aquaculture']
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
  'Maritime': 'ocean',
  'Travel': 'tourism',
  'Hospitality': 'tourism',
  'Sports': 'sports',
  'Environmental Services': 'water',
  'Utilities': 'water',
  'Military': 'defense',
  'Security': 'defense'
};

