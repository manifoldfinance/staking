import type { ERC20 } from '@/contracts/types';
import useSWR from 'swr';
import { useTokenContract } from '../shared/useContract';
import useKeepSWRDataLiveAsBlocksArrive from './useTokenBalance/useKeepSWRDataLiveAsBlocksArrive';

const getTokenBalance =
  (contract: ERC20) => async (_: string, address: string) => {
    const value = await contract.balanceOf(address);

    return value;
  };

export default function useTokenBalance(address: string, tokenAddress: string) {
  const contract = useTokenContract(tokenAddress);

  const shouldFetch =
    !!contract &&
    typeof address === 'string' &&
    typeof tokenAddress === 'string';

  const result = useSWR(
    shouldFetch ? ['TokenBalance', address, tokenAddress] : null,
    getTokenBalance(contract),
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
