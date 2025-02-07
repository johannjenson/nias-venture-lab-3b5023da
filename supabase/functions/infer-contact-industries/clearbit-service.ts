
import { ClearbitCompany } from './types.ts';

export async function lookupCompany(companyName: string): Promise<ClearbitCompany | null> {
  try {
    // First try to find the company domain
    const domainResponse = await fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(companyName)}`,
      {
        headers: {
          'Authorization': `Bearer ${Deno.env.get('CLEARBIT_API_KEY')}`
        }
      }
    );

    if (!domainResponse.ok) {
      console.error('Clearbit API error:', await domainResponse.text());
      return null;
    }

    const suggestions = await domainResponse.json();
    if (!suggestions || suggestions.length === 0) {
      return null;
    }

    // Get the first suggestion's domain
    const domain = suggestions[0].domain;

    // Then get detailed company information
    const companyResponse = await fetch(
      `https://company.clearbit.com/v2/companies/find?domain=${domain}`,
      {
        headers: {
          'Authorization': `Bearer ${Deno.env.get('CLEARBIT_API_KEY')}`
        }
      }
    );

    if (!companyResponse.ok) {
      console.error('Clearbit Company API error:', await companyResponse.text());
      return null;
    }

    return await companyResponse.json();
  } catch (error) {
    console.error('Error looking up company:', error);
    return null;
  }
}
