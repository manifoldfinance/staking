import type { BasketBalancer } from '@/contracts/types';
import useSWR from 'swr';
import { useBasketBalancer } from '../useContract';
import useWeb3Store from '../useWeb3Store';

function getHasVotedInEpoch(contract: BasketBalancer) {
  return async (_: string, user: string) => {
    const epoch = await contract.getCurrentEpoch();

    const hasVotedInEpoch: boolean = await contract.hasVotedInEpoch(
      user,
      epoch,
    );

    return hasVotedInEpoch;
  };
}

export default function useHasVotedInEpoch() {
  const account = useWeb3Store((state) => state.account);

  const contract = useBasketBalancer();

  const shouldFetch = !!contract && typeof account === 'string';

  return useSWR(
    shouldFetch ? ['HasVotedInEpoch', account] : null,
    getHasVotedInEpoch(contract),
  );
}
