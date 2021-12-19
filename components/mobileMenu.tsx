import { Menu } from '@headlessui/react';
import cn from 'classnames';
import Link from 'next/link';
import { Menu as MenuIcon } from 'react-feather';

const menuItemClassNames =
  'flex rounded items-center w-full p-2 text-sm focus:outline-none';

function NextLink(props) {
  let { active = false, href, children, ...rest } = props;

  return (
    <Link href={href}>
      <a
        className={cn(menuItemClassNames, active && 'bg-white/[0.10]')}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
}

export default function MobileMenu() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex p-2 rounded-xl focus:outline-none text-gray-500 hover:text-white transition-colors">
        <MenuIcon size={24} />
      </Menu.Button>

      <Menu.Items className="absolute left-0 w-40 mt-2 origin-top-left bg-primary-400 ring-1 ring-inset ring-white ring-opacity-10 rounded-lg focus:outline-none p-1 z-50">
        <Menu.Item>
          {({ active }) => (
            <NextLink href="https://analytics.sushi.com/tokens/0xd084944d3c05cd115c09d072b9f44ba3e0e45921" active={active}>
              FOLD
            </NextLink>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <NextLink href="/stake" active={active}>
              Stake
            </NextLink>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <NextLink href="#" active={active}>
              Protocol
            </NextLink>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <NextLink href="#" active={active}>
              Payouts
            </NextLink>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
