export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(value);
};

export const formatCompactNumber = (value: number): string => {
  const suffixes = ['', 'rb', 'jt', 'm', 'b', 't'];
  const suffixNum = Math.floor(Math.log10(Math.abs(value)) / 3);
  const shortValue = (value / Math.pow(1000, suffixNum)).toFixed(1);

  return parseFloat(shortValue) % 1 !== 0
    ? shortValue + suffixes[suffixNum]
    : parseFloat(shortValue).toFixed(0) + suffixes[suffixNum];
};

// ... existing code ...
