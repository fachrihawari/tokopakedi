export const formatCurrency = (value: number) => {
  const options: Intl.NumberFormatOptions = {
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  };

  const currency = 'Rp. '
  return currency + value.toLocaleString('id-ID', options);
};

export const formatCompactNumber = (value: number): string => {
  const suffixes = ['', 'rb', 'jt', 'm', 'b', 't'];
  const suffixNum = Math.floor(Math.log10(Math.abs(value)) / 3);
  const shortValue = (value / Math.pow(1000, suffixNum)).toFixed(1);

  return parseFloat(shortValue) % 1 !== 0
    ? shortValue + suffixes[suffixNum]
    : parseFloat(shortValue).toFixed(0) + suffixes[suffixNum];
};
