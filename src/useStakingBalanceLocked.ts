import type { DOMODAO as DictatorDAO } from '@/contracts/types';
import useSWR from 'swr';
import { useDictatorDAO } from './shared/useContract';

function balanceOf(contract: DictatorDAO) {
  return async (_: string, user: string, token: string) => {
    const balanceLocked = await contract.balanceOf(user);

    return balanceLocked;
  };
}

export default function getStakingBalance(user: string, token: string) {
  const contract = useDictatorDAO();

  const shouldFetch =
    !!contract && typeof user === 'string' && typeof token === 'string';

  return useSWR(
    shouldFetch ? ['balanceOf', user, token] : null,
    getStakingBalance(user, token),
  );
}
