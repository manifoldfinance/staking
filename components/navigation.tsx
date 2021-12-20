import classNames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddTokensToMetaMask from './addTokensToMetamask';
import NetworkIndicator from './network';
import dynamic from 'next/dynamic';
import { Account } from './web3';
import OverflowMenu from './overflowMenu';
import MobileMenu from './mobileMenu';

function NavigationItem({ text, href }: { text: string; href: string }) {
  const { asPath } = useRouter();

  const cachedClassNames = classNames(
    'font-medium leading-5 flex items-center justify-center py-2 px-2 text-center leading-5 focus:outline-none focus:text-gray-300 rounded transition-colors',
    asPath === href ? 'text-white ' : 'text-gray-500',
  );

  return (
    <Link href={href}>
      <a className={cachedClassNames}>{text}</a>
    </Link>
  );
}

const WalletModal = dynamic(() => import('../components/walletModal'), {
  ssr: false,
});

export default function Navigation() {
  return (
    <nav className="px-5 py-4 text-white md:px-8">
      <ul className="flex justify-between items-center">
        <li className="flex-shrink-0">
          <div className="flex items-center">
            <div className="block mr-2 xl:hidden">
              <MobileMenu />
            </div>

            <Link href="#">
              <a
                className="flex items-center transition-colors md:space-x-2 focus:outline-none focus:text-gray-300 hover:text-gray-300"
                aria-label="Home"
              >
                <img
                  className="w-10 h-10"
                  src="/logo.png"
                  alt="Manifold Finance"
                  loading="eager"
                />

                <span
                  className="hidden text-2xl font-light tracking-wide leading-none select-none md:block"
                  role="img"
                  aria-label="Manifold Finance"
                >
                  Manifold Finance
                </span>
              </a>
            </Link>
          </div>
        </li>

        <li className="hidden flex-1 xl:block">
          <ul className="flex space-x-2 md:ml-4 xl:space-x-4">
            <li>
              <NavigationItem href="/stake" text="Stake" />
            </li>
            <li>
              <NavigationItem
                href="https://t.me/manifoldfinance"
                text="Telegram"
              />
            </li>
          </ul>
        </li>

        <li className="flex flex-shrink-0 justify-end flex-grow-1 md:space-x-4">
          <NetworkIndicator />

          <AddTokensToMetaMask />

          <div className="flex space-x-2">
            <Account />

            <OverflowMenu />
          </div>
        </li>
      </ul>

      <WalletModal />
    </nav>
  );
}
