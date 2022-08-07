import type { BigNumberish } from '@ethersproject/bignumber';
import type { DOMODAO } from '@/contracts/types';
import { parseUnits } from '@ethersproject/units';
import { useDictatorDAO } from './shared/useContract';
import useSWR from 'swr';

function getXFoldAmountOut(contract: DOMODAO) {
  return async (_: string, amount: BigNumberish, operatorVote: string) => {
    const getXFoldAmountOutSingle = await contract.mint(amount, operatorVote);

    return getXFoldAmountOutSingle;
  };
}

export default function useGetFoldAmountOut(
  amount: BigNumberish,
  operatorVote: string,
) {
  const contract = useDictatorDAO();

  const shouldFetch =
    !!contract &&
    typeof amount === 'string' &&
    typeof operatorVote === 'string';

  return useSWR(
    shouldFetch ? ['GetFoldAmountOut', amount, operatorVote] : null,
    getXFoldAmountOut(contract),
    {
      shouldRetryOnError: false,
    },
  );
}
