import type { DOMODAO as DictatorDAO } from '@/contracts/types';
import { useDictatorDAO } from '@/hooks/useContract';
import useSWR from 'swr';
import useWeb3Store from '../useWeb3Store';
import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';
// import { TOKEN_ADDRESSES } from '@/constants/tokens';

export function getXFOLDStaked(contract: DictatorDAO) {
  return async (_: string, user: string) => {
    const value = await contract.balanceOf(user);

    return value;
  };
}

// TODO
// TEST: state mgmt vs parse account
export function usexFOLDStaked(
  //  address: string,
  tokenAddress = 0x454bd9e2b29eb5963048cc1a8bd6fd44e89899cb,
  suspense = false,
) {
  const address = useWeb3Store((state) => state.account);

  const contract = useDictatorDAO();

  const shouldFetch =
    typeof address === 'string' &&
    typeof tokenAddress === 'string' &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ['TokenBalance', address, tokenAddress] : null,
    getXFOLDStaked(contract),
    {
      suspense,
    },
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
