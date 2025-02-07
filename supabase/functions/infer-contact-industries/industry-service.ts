
import { Contact, ClearbitCompany, IndustryType } from './types.ts';
import { industryKeywords, clearbitToIndustryMap } from './constants.ts';

async function extractLinkedInData(linkedinUrl: string | null): Promise<string> {
  if (!linkedinUrl) return '';
  
  // For now just extract company name and title from URL
  // Could be enhanced with actual LinkedIn API integration
  const urlParts = linkedinUrl.split('/');
  return urlParts.filter(part => part.length > 0).join(' ');
}

export async function inferIndustry(contact: Contact, companyInfo?: ClearbitCompany | null): Promise<IndustryType | null> {
  // First try to use Clearbit industry information if available
  if (companyInfo?.category?.industry) {
    const mappedIndustry = clearbitToIndustryMap[companyInfo.category.industry];
    if (mappedIndustry) {
      return mappedIndustry;
    }
  }

  // Gather all available text data about the contact/company
  const linkedInData = await extractLinkedInData(contact.linkedin_url);
  
  // Using all available data points for analysis
  const textToAnalyze = [
    contact.company,
    contact.title,
    contact.notes,
    companyInfo?.description,
    contact.company_domain,
    linkedInData,
    // Include company category and sector if available
    companyInfo?.category?.sector,
    companyInfo?.category?.industry,
  ].filter(Boolean).join(' ').toLowerCase();

  // Score each industry based on keyword matches with weighted scoring
  const scores = Object.entries(industryKeywords).map(([industry, keywords]) => {
    let score = 0;
    
    // Weight different keywords differently
    keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      // Count occurrences of each keyword
      const occurrences = (textToAnalyze.match(new RegExp(keywordLower, 'g')) || []).length;
      
      // Add to score based on occurrences and location of keyword
      if (occurrences > 0) {
        // Higher weight if keyword appears in company name or title
        if (contact.company?.toLowerCase().includes(keywordLower) || 
            contact.title?.toLowerCase().includes(keywordLower)) {
          score += occurrences * 2;
        } else {
          score += occurrences;
        }
      }
    });
    
    return { industry, score };
  });

  // Sort by score and get the highest scoring industry
  const [topIndustry] = scores
    .sort((a, b) => b.score - a.score)
    .filter(({ score }) => score > 0);

  return topIndustry ? topIndustry.industry as IndustryType : null;
}

