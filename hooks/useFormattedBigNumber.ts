import type { BigNumber } from '@ethersproject/bignumber';
import { commify, formatUnits } from '@ethersproject/units';
import { useMemo } from 'react';

export default function useFormattedBigNumber(value: BigNumber, decimals = 2) {
  return useMemo(() => {
    if (value) {
      return commify(Number(formatUnits(value)).toFixed(decimals));
    }

    return Number(0).toFixed(decimals);
  }, [value, decimals]);
}
