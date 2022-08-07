import type { Web3Provider } from '@ethersproject/providers';
import useSWR from 'swr';
import useWeb3Store from '../../../shared/useWeb3Store';

function getBlockNumber(library: Web3Provider) {
  return async () => {
    return library.getBlockNumber();
  };
}

export default function useBlockNumber() {
  const library = useWeb3Store((state) => state.library);

  const shouldFetch = !!library;

  return useSWR(shouldFetch ? ['BlockNumber'] : null, getBlockNumber(library), {
    refreshInterval: 10 * 1000,
  });
}
