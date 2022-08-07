import { Token } from '@/components/tokenSelect';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { TOKEN_NAMES_BY_ADDRESS } from '@/constants/tokens';
import { FOLD } from '@/contracts/types';
import useSWR from 'swr';
// import useBestBuy from '../useBestBuy';
import { useFoldToken } from './shared/useContract';

function getFoldTokens(contract: FOLD) {
  return async (_: string, bestBuy?: Record<string, bigint>) => {
    const values = await contract.getFoldTokens();

    const formatted: Token[] = values
      .map((addr) => addr.toLowerCase())
      .map((address) => {
        return {
          address: address,
          symbol: TOKEN_NAMES_BY_ADDRESS[address],
          out: BigInt(bestBuy?.[address] ?? 0),
        };
      });

    return formatted;
  };
}

export default function useGetFoldTokens() {
  const { data: balanceOf } = useFoldToken();

  const contract = useFoldToken();

  const shouldFetch = !!contract;

  return useSWR(
    shouldFetch ? ['GetFoldTokens', balanceOf] : null,
    getFoldTokens(contract),
  );
}
