export function formatCurrency(
  amount: number | undefined,
  currencyCode: string = "BDT",
  locale: string = "en-BD"
): string {
  if (amount === undefined) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
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
