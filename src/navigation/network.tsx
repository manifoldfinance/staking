import { ChainInfo, CHAIN_INFO, SupportedChainId } from '@/constants/chains';
import useWeb3Store from '@/hooks/useWeb3Store';
import { useMemo } from 'react';

export default function NetworkIndicator() {
  const chainId = useWeb3Store((state) => state.chainId);

  const info: ChainInfo = useMemo(() => {
    return CHAIN_INFO[chainId];
  }, [chainId]);

  if (
    typeof chainId === 'undefined' ||
    chainId === SupportedChainId.MAINNET ||
    !info
  ) {
    return null;
  }

  return (
    <div className="fixed transform -translate-x-1/2 left-1/2 bottom-4 md:relative md:transform-none md:bottom-auto md:left-auto px-6 md:px-4 py-3 bg-primary-400 md:bg-network-rinkeby/[0.10] ring-1 ring-inset ring-network-rinkeby text-network-rinkeby text-sm rounded-full md:rounded-xl z-50 md:z-auto">
      {info.label}
    </div>
  );
}
