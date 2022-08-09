import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { classNames } from 'kindelia/react/classNames'

import Searchbar from './Searchbar'
import { SelectNode } from './SelectNode'
import ToggleTheme from './ToggleTheme'
import ViewNotification from './ViewNotification'

const ProfileDropdown = dynamic(() => import('./ProfileDropdown'), {
  ssr: false,
})

export default function Navigation(props: {
  nav: any
  plugins: {
    Searchbar: boolean
    SelectNode: boolean
    ToggleTheme: boolean
    ViewNotification: boolean
    ProfileDropdown: boolean
  }
}) {
  const { asPath } = useRouter()
  const [navigation, setNavigation] = useState<any>(props.nav)

  useEffect(() => {
    setNavigation((prev: any) => {
      return [...prev].map((nav) => {
        nav.current = nav.href === asPath
        return nav
      })
    })
  }, [asPath])

  function NavigationButtons() {
    return (
      <>
        {navigation.map((item: any) => (
          <Link key={item.name} href={item.href}>
            <Disclosure.Button //on desktop should be a "<a"
              className={classNames(
                item.current ? 'themeBorder' : 'border-transparent',
                'px-3 py-2 rounded-md font-medium text-base block transition-all border-2 themeHover'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Disclosure.Button>
          </Link>
        ))}
      </>
    )
  }

  return (
    <Disclosure as="nav" className="sticky top-0 shadow z-10 themeDefault">
      {({ open }) => (
        <>
          <div className="max-w-7xl m-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <a>
                      <img
                        className="block h-8 w-auto dark:invert"
                        src="/kindelia_logo.svg"
                        alt="Kindelia logo"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-2">
                    <NavigationButtons />
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 hidden sm:flex sm:flex-1 justify-end items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {props.plugins.Searchbar && (
                  <Searchbar className="rounded-md mr-3 flex-1 max-w-xs" />
                )}
                {props.plugins.SelectNode && <SelectNode />}
                {props.plugins.ToggleTheme && <ToggleTheme />}
                {props.plugins.ViewNotification && <ViewNotification />}
                {props.plugins.ProfileDropdown && <ProfileDropdown />}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavigationButtons />
              {props.plugins.Searchbar && (
                <Searchbar className="rounded block w-full" />
              )}
              {props.plugins.SelectNode && <SelectNode />}
              {props.plugins.ToggleTheme && <ToggleTheme />}
              {props.plugins.ViewNotification && <ViewNotification />}
              {props.plugins.ProfileDropdown && <ProfileDropdown />}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
