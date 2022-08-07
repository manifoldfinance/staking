import { useFoldToken, useDictatorDAO } from '@/hooks/useContract';
import type { DOMODAO as DictatorDAO } from '@/contracts/types';
import { parseUnits } from '@ethersproject/units';
import useSWR from 'swr';

function getFoldAmountOut(contract: DictatorDAO) {
  return async (_: string, amount: string, operatorAddress: string) => {
    const getFoldAmountOutSingle = await contract.mint(amount, operatorAddress);

    return getFoldAmountOutSingle;
  };
}

export default function useGetFoldAmountOut(
  amount: string,
  operatorAddress: string,
) {
  const contract = useDictatorDAO();

  const shouldFetch =
    !!contract &&
    typeof amount === 'string' &&
    typeof operatorAddress === 'string';

  return useSWR(
    shouldFetch ? ['GetFoldAmountOut', amount, operatorAddress] : null,
    getFoldAmountOut(contract),
    {
      shouldRetryOnError: false,
    },
  );
}
