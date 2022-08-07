import type { ERC20 } from '@/contracts/types';
import useSWR from 'swr';
import { useTokenContract } from './shared/useContract';

const getTokenAllowance =
  (contract: ERC20) =>
  async (_: string, __: string, owner: string, spender: string) => {
    const value = await contract.allowance(owner, spender);

    return value;
  };

export default function useTokenAllowance(
  tokenAddress: string,
  owner: string,
  spender: string,
) {
  const contract = useTokenContract(tokenAddress);

  const shouldFetch =
    !!contract &&
    typeof owner === 'string' &&
    typeof tokenAddress === 'string' &&
    typeof spender === 'string';

  return useSWR(
    shouldFetch ? ['TokenBalance', tokenAddress, owner, spender] : null,
    getTokenAllowance(contract),
  );
}
