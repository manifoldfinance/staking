import { TOKEN_NAMES_BY_ADDRESS } from '@/constants/tokens';
import type { BasketBalancer } from '@/contracts/types';
import { formatUnits } from '@ethersproject/units';
import useSWR from 'swr';
import { useBasketBalancer } from '../useContract';

function getContinuousTokenAllocation(contract: BasketBalancer) {
  return async () => {
    const tokens = await contract.getTokens();

    const tokenAllocations = await Promise.all(
      tokens.map(async (poolAddress) => {
        const targetAllocationInWei = await contract.getTargetAllocation(
          poolAddress,
        );

        const continuousVoteInWei = await contract.continuousVote(poolAddress);

        const continuousVote = parseFloat(formatUnits(continuousVoteInWei));

        const targetAllocation = parseFloat(formatUnits(targetAllocationInWei));

        const percentChange =
          ((continuousVote - targetAllocation) / targetAllocation) * 100;

        return {
          address: poolAddress,
          symbol: TOKEN_NAMES_BY_ADDRESS[poolAddress.toLowerCase()],
          allocation: continuousVote,
          percentChange,
        };
      }),
    );

    return tokenAllocations;
  };
}

export default function useContinuousTokenAllocation() {
  const contract = useBasketBalancer();

  const shouldFetch = !!contract;

  return useSWR(
    shouldFetch ? ['ContinuousTokenAllocation'] : null,
    getContinuousTokenAllocation(contract),
  );
}
