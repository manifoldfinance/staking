import type { BigNumberish } from '@ethersproject/bignumber';
import { formatFixed } from '@ethersproject/bignumber';

/**
 * @name btof
 * @description Converts a BigNumber to Float based on the provided decimals
 */
export function btof(value?: BigNumberish, decimals = 18) {
  return parseFloat(formatFixed(value, decimals));
}
