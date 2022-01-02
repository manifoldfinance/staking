import type { Staking } from '@/contracts/types';
import useSWR from 'swr';
import {} from '../useContract';
import useWeb3Store from '../useWeb3Store';

function getXFOLDStaked(contract: Staking) {
  return async (_: string, user: string) => {
    const value = await contract.balanceOf(user);

    return value;
  };
}

export default function useXFOLDStaked() {
  const account = useWeb3Store((state) => state.account);

  const contract = useXFOLDStaked();

  const shouldFetch = !!contract && typeof account === 'string';

  return useSWR(
    shouldFetch ? ['XFOLDStaked', account] : null,
    getXFOLDStaked(contract),
  );
}
