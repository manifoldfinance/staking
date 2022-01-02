import { TOKEN_ASSETS, TOKEN_ADDRESSES } from '@/constants/tokens';
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
        
        const XFOLD = TOKEN_ASSETS.XFOLD[chainId];

        const FOLD = TOKEN_ASSETS.FOLD[chainId];
       await library.provider.request({
       // await library.provider.request({
         
          method: 'wallet_watchAsset',
          params: {
            // @ts-ignore
            type: 'ERC20',
            options: {
              address: TOKEN_ADDRESSES.XFOLD,
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
              address: TOKEN_ADDRESSES.FOLD,
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

// window.addEventListener('DOMContentLoaded', initialize);
