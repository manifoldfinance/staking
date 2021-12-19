import { useDictatorDAO } from '@/hooks/useContract';
import type { DOMODAO } from '@/contracts/types';
import useSWR from 'swr';

import useWeb3Store from '../useWeb3Store';

function getXFOLDStaked(contract: DOMODAO) {
  return async (_: string, user: string) => {
    const value = await contract.balanceOf(user);

    return value;
  };
}

export default function useXFOLDStaked() {
  const account = useWeb3Store((state) => state.account);

  const contract = useDictatorDAO();

  const shouldFetch = !!contract && typeof account === 'string';

  return useSWR(
    shouldFetch ? ['XFOLDStaked', account] : null,
    getXFOLDStaked(contract),
  );
}
