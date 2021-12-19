import type { WrappingRewards } from '@/contracts/types';
import useSWR from 'swr';
import { useWrappingRewards } from '../useContract';

function getIsBoosted(contract: WrappingRewards) {
  return async (_: string, user: string) => {
    const currentEpoch = await contract.getCurrentEpoch();

    const isBoosted = await contract.isBoosted(user, currentEpoch);

    return isBoosted;
  };
}

export default function useIsBoosted(userAddress: string) {
  const contract = useWrappingRewards();

  const shouldFetch = !!contract && typeof userAddress === 'string';

  return useSWR(
    shouldFetch ? ['IsBoosted', userAddress] : null,
    getIsBoosted(contract),
  );
}
