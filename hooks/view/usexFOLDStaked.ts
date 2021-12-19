import type { DOMODAO as DictatorDAO } from '@/contracts/types';
import { useDictatorDAO } from '@/hooks/useContract';
import useSWR from 'swr';
import useWeb3Store from '../useWeb3Store';

export function getxFOLDStaked(contract: DictatorDAO) {
  return async (_: string, user: string) => {
    const value = await contract.balanceOf(user);

    return value;
  };
}

export function useXFOLDStaked() {
  const account = useWeb3Store((state) => state.account);

  const contract = useDictatorDAO();

  const shouldFetch = !!contract && typeof account === 'string';

  return useSWR(
    shouldFetch ? ['balanceOf', account] : null,
    getxFOLDStaked(contract),
  );
}
