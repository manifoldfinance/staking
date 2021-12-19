import type { BasketBalancer } from '@/contracts/types';
import { formatUnits } from '@ethersproject/units';
import useSWR from 'swr';
import { useBasketBalancer } from '../useContract';

function getMaxDelta(contract: BasketBalancer) {
  return async () => {
    const delta = await contract.maxDelta();

    return parseFloat(formatUnits(delta));
  };
}

export default function useMaxDelta() {
  const contract = useBasketBalancer();

  const shouldFetch = !!contract;

  return useSWR(shouldFetch ? ['MaxDelta'] : null, getMaxDelta(contract));
}
