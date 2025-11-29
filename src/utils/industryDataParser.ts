/**
 * Parse investment or TAM string to billions
 * Examples: "$600+ billion" -> 600, "$2.5 trillion" -> 2500, "$1.3+ trillion" -> 1300
 */
export const parseToNearestBillion = (value: string): number => {
  // Remove non-numeric characters except decimal point
  const cleaned = value.replace(/[^0-9.]/g, '');
  const number = parseFloat(cleaned);
  
  if (isNaN(number)) return 0;
  
  // Check if it's in trillions
  if (value.toLowerCase().includes('trillion')) {
    return number * 1000; // Convert to billions
  }
  
  // Already in billions
  return number;
};

/**
 * Format billions back to readable string
 */
export const formatBillions = (billions: number): string => {
  if (billions >= 1000) {
    return `$${(billions / 1000).toFixed(1)}T`;
  }
  return `$${billions.toFixed(0)}B`;
};
