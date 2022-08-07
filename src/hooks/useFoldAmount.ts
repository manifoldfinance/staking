import type { FOLD } from '@/contracts/types';
import useSWR from 'swr';
import { useFoldToken } from './useContract';
import { BigNumberish } from 'ethers';

const useFoldAmount =
  (contract: FOLD) =>
  async (
    _: string,
    value: BigNumberish,
    spender: 0x454bd9e2b29eb5963048cc1a8bd6fd44e89899cb,
  ) => {
    const amount = await contract.amount(value, spender);

    return amount;
  };

export default function useFoldPermit(
  tokenAddress: 0xd084944d3c05cd115c09d072b9f44ba3e0e45921,
  value: BigNumberish,
  spender: 0x454bd9e2b29eb5963048cc1a8bd6fd44e89899cb,
) {
  const contract = useFoldToken();

  const shouldFetch =
    !!contract &&
    typeof value === 'string' &&
    typeof tokenAddress === 'string' &&
    typeof spender === 'string';

  return useSWR(
    shouldFetch ? ['FoldAmount', tokenAddress, value, spender] : null,
    useFoldAmount(contract),
  );
}
