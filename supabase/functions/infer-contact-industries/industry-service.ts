
import { Contact, ClearbitCompany, IndustryType } from './types.ts';
import { industryKeywords, clearbitToIndustryMap } from './constants.ts';

export function inferIndustry(contact: Contact, companyInfo?: ClearbitCompany | null): IndustryType | null {
  // First try to use Clearbit industry information if available
  if (companyInfo?.category?.industry) {
    const mappedIndustry = clearbitToIndustryMap[companyInfo.category.industry];
    if (mappedIndustry) {
      return mappedIndustry;
    }
  }

  // Fall back to keyword matching using all available text
  const textToAnalyze = [
    contact.company,
    contact.title,
    contact.notes,
    companyInfo?.description
  ].filter(Boolean).join(' ').toLowerCase()

  // Score each industry based on keyword matches
  const scores = Object.entries(industryKeywords).map(([industry, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (textToAnalyze.includes(keyword.toLowerCase()) ? 1 : 0)
    }, 0)
    return { industry, score }
  })

  // Sort by score and get the highest scoring industry
  const [topIndustry] = scores
    .sort((a, b) => b.score - a.score)
    .filter(({ score }) => score > 0)

  return topIndustry ? topIndustry.industry as IndustryType : null
}
