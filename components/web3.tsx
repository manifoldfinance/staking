import { TOKEN_ADDRESSES } from '@/constants/tokens';
import useENSName from '@/hooks/useENSName';
import useWalletModal from '@/hooks/useWalletModal';
import useWeb3Store from '@/hooks/useWeb3Store';
import useTokenBalance from '@/hooks/view/useTokenBalance';
import shortenAddress from '@/utils/shortenAddress';
import { formatUnits } from '@ethersproject/units';
import { Menu } from '@headlessui/react';
import cn from 'classnames';
import { useCallback, useMemo } from 'react';
import Identicon from './identicon';

const menuItemClassNames =
  'flex rounded items-center w-full p-2 text-sm focus:outline-none';

export function Account() {
  const account = useWeb3Store((state) => state.account);
  const connector = useWeb3Store((state) => state.connector);
  const chainId = useWeb3Store((state) => state.chainId);
  const reset = useWeb3Store((state) => state.reset);

  const openWalletModal = useWalletModal((state) => state.open);

  const ENSName = useENSName(account);

  const { data: foldBalance } = useTokenBalance(
    account,
    TOKEN_ADDRESSES.FOLD[chainId],
  );

  const formattedFOLDBalance = useMemo(
    () => Number(formatUnits(foldBalance ?? 0)).toFixed(2),
    [foldBalance],
  );

  const disconnect = useCallback(() => {
    connector?.deactivate();

    reset();
  }, [connector, reset]);

  if (account)
    return (
      <Menu as="div" className="relative">
        <div className="bg-primary-400 rounded-xl flex items-center w-[fit-content] ml-auto">
          {foldBalance && (
            <div className="hidden sm:block flex-shrink-0 px-3 text-sm">
              {`${formattedFOLDBalance} FOLD`}
            </div>
          )}

          <Menu.Button className="inline-flex space-x-2 w-full px-4 py-3 bg-primary-300 ring-1 ring-inset ring-white ring-opacity-20 text-sm rounded-xl focus:outline-none focus-visible:ring-opacity-40 hover:ring-opacity-40">
            <Identicon address={account} />

            <span>{ENSName ?? shortenAddress(account)}</span>
          </Menu.Button>
        </div>

        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-primary-300 ring-1 ring-inset ring-white ring-opacity-20 rounded-lg focus:outline-none p-1 z-50">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={disconnect}
                className={cn(menuItemClassNames, active && 'bg-white/[0.10]')}
              >
                Disconnect Wallet
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    );

  return (
    <button
      className="bg-white text-primary rounded-lg block ml-auto px-4 py-3 text-sm font-medium focus:outline-none focus:ring-4"
      onClick={openWalletModal}
    >
      {`Connect Wallet`}
    </button>
  );
}
