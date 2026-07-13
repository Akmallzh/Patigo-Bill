export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatShortRupiah(amount) {
  if (amount >= 1000000) {
    return 'Rp ' + (amount / 1000000).toFixed(1).replace('.0', '') + 'jt';
  } else if (amount >= 1000) {
    return 'Rp ' + (amount / 1000).toFixed(0) + 'rb';
  }
  return 'Rp ' + amount;
}
