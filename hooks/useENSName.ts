import type { Web3Provider } from '@ethersproject/providers';
import useSWR from 'swr';
import useWeb3Store from './useWeb3Store';

function getENSName(library: Web3Provider) {
  return async (_: string, account: string) => {
    const lookupAddress = await library.lookupAddress(account);

    return lookupAddress;
  };
}

export default function useENSName(account: string) {
  const library = useWeb3Store((state) => state.library);

  const shouldFetch = !!library && typeof account === 'string';

  const result = useSWR(
    shouldFetch ? ['ENSName', account] : null,
    getENSName(library),
  );

  return result?.data;
}
