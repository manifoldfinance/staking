// import { SUSHI_SWAP_LINKS } from '@/constants/tokens';
import { Menu } from '@headlessui/react';
import cn from 'classnames';
import Link from 'next/link';
import { MoreHorizontal } from 'react-feather';

function NextLink(props) {
  let { href, children, ...rest } = props;

  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

const menuItemClassNames =
  'flex rounded items-center w-full p-2 text-sm focus:outline-none';

export default function OverflowMenu() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex px-3 py-3 space-x-2 w-full text-sm rounded-xl ring-1 ring-inset ring-white ring-opacity-10 bg-primary-400 focus:outline-none focus-visible:ring-opacity-20 hover:ring-opacity-20">
        <MoreHorizontal size={20} />
      </Menu.Button>

      <Menu.Items className="absolute right-0 z-50 p-1 mt-2 w-56 rounded-lg ring-1 ring-inset ring-white ring-opacity-10 origin-top-right bg-primary-400 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              href={"https://app.sushi.com/swap?outputCurrency=0xd084944d3c05CD115C09d072B9F44bA3E0E45921"}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(menuItemClassNames, active && 'bg-white/[0.10]')}
            >
              Buy FOLD on SushiSwap
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href={"ttps://app.sushi.com/swap?outputCurrency=0x454BD9E2B29EB5963048cC1A8BD6fD44e89899Cb"}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(menuItemClassNames, active && 'bg-white/[0.10]')}
            >
              XFOLD
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <NextLink
              href="/faqs"
              className={cn(menuItemClassNames, active && 'bg-white/[0.10]')}
            >
              FAQs
            </NextLink>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="https://manifoldfinance.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(menuItemClassNames, active && 'bg-white/[0.10]')}
            >
              About
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="https://github.com/manifoldfinance"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(menuItemClassNames, active && 'bg-white/[0.10]')}
            >
              Developers
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="https://forums.manifoldfinance.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(menuItemClassNames, active && 'bg-white/[0.10]')}
            >
              Forums
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
