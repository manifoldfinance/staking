import { TOKEN_ASSETS } from '@/constants/tokens';
import { useCallback, useState } from 'react';
import useWeb3Store from './useWeb3Store';

export default function useAddTokenToMetaMask(): {
  addToken: () => void;
  success: boolean | undefined;
} {
  const chainId = useWeb3Store((state) => state.chainId);
  const library = useWeb3Store((state) => state.library);

  const [success, setSuccess] = useState<boolean | undefined>();

  const addToken = useCallback(async () => {
    try {
      if (library && library.provider.isMetaMask && library.provider.request) {
        const XFOLD = TOKEN_ASSETS.xFOLD[chainId];

        const FOLD = TOKEN_ASSETS.FOLD[chainId];

        await library.provider.request({
          method: 'wallet_watchAsset',
          params: {
            //@ts-ignore
            type: 'ERC20',
            options: {
              address: XFOLD.address,
              symbol: XFOLD.symbol,
              decimals: XFOLD.decimals,
            },
          },
        });

        await library.provider.request({
          method: 'wallet_watchAsset',
          params: {
            //@ts-ignore
            type: 'ERC20',
            options: {
              address: FOLD.address,
              symbol: FOLD.symbol,
              decimals: FOLD.decimals,
            },
          },
        });

        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);

      setSuccess(false);
    }
  }, [library, chainId]);

  return {
    addToken,
    success,
  };
}
