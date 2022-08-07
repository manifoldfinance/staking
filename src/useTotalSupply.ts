import { ERC20 } from '@/contracts/types';
import useSWR from 'swr';
import { useTokenContract } from './shared/useContract';

function getTotalSupply(contract: ERC20) {
  return async () => {
    const totalSupply = await contract.totalSupply();

    return totalSupply;
  };
}

export default function useTotalSupply(tokenAddress: string) {
  const contract = useTokenContract(tokenAddress);

  const shouldFetch = !!contract;

  return useSWR(
    shouldFetch ? ['TotalSupply', tokenAddress] : null,
    getTotalSupply(contract),
  );
}
