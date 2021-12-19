import {
  TOKEN_CATEGORY_BY_SYMBOL,
  TOKEN_NAMES_BY_ADDRESS,
} from '@/constants/tokens';
import type { BasketBalancer } from '@/contracts/types';
import { formatUnits } from '@ethersproject/units';
import useSWR from 'swr';
import { useBasketBalancer } from '../useContract';

function getTokenAllocation(contract: BasketBalancer) {
  return async () => {
    const tokens = await contract.getTokens();

    const tokenAllocations = await Promise.all(
      tokens.map(async (poolAddress) => {
        const allocationInWei = await contract.getTargetAllocation(poolAddress);

        const allocation = parseFloat(
          parseFloat(formatUnits(allocationInWei)).toFixed(2),
        );

        const SYMBOL = TOKEN_NAMES_BY_ADDRESS[poolAddress.toLowerCase()];

        return {
          address: poolAddress,
          symbol: SYMBOL,
          allocationInWei,
          allocation,
          category: TOKEN_CATEGORY_BY_SYMBOL[SYMBOL],
        };
      }),
    );

    return tokenAllocations;
  };
}

export default function useTokenAllocation() {
  const contract = useBasketBalancer();

  const shouldFetch = !!contract;

  return useSWR(
    shouldFetch ? ['TokenAllocation'] : null,
    getTokenAllocation(contract),
  );
}
