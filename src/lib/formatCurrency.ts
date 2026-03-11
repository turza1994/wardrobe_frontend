/**
 * Format a number as Bangladeshi Taka (BDT)
 * e.g. 1299 → "৳1,299"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format price with Taka sign prefix
 * e.g. 1299 → "৳1,299"
 */
export function formatPrice(amount: number): string {
  return `৳${amount.toLocaleString('en-BD')}`;
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  if (!originalPrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}
