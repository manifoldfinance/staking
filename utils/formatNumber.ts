import { commify } from '@ethersproject/units';

export default function formatNumber(value?: number, decimals = 2) {
  if (typeof value === 'number') {
    return commify(value.toFixed(decimals));
  }

  return Number(0).toFixed(decimals);
}
