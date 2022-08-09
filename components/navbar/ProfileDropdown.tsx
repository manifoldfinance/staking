import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { useMetamaskStore } from 'kindelia/metamask/useMetamaskStore'
import { classNames } from 'kindelia/react/classNames'

import { DropdownTransition } from './DropdownTransition'

export default function ProfileDropdown() {
  const router = useRouter()

  const [account, login, logout, handleAccountsChanged] = useMetamaskStore(
    (store) => [
      store.account,
      store.login,
      store.logout,
      store.handleAccountsChanged,
    ]
  )

  useEffect(() => {
    if (!window.ethereum) return

    const handleAccount = async (accounts: string[]) => {
      handleAccountsChanged(accounts)
      router.reload()
    }

    window.ethereum.on('chainChanged', router.reload)
    window.ethereum.on('accountsChanged', handleAccount as any)

    return () => {
      window.ethereum?.removeAllListeners()
    }
  }, [router, handleAccountsChanged])

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="w-8 flex text-sm rounded-full ">
          <span className="sr-only">Open user menu</span>
          {account ? (
            <Jazzicon diameter={32} seed={jsNumberForAddress(account)} />
          ) : (
            <FontAwesomeIcon size="lg" icon={faWallet} />
          )}
        </Menu.Button>
      </div>
      <DropdownTransition>
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {account ? (
            <>
              <Menu.Item>
                <span className="px-4 py-2 w-full block text-center text-gray-700">
                  {account.substring(0, 5)}...{account.slice(-4)}
                </span>
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700 w-full'
                    )}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={login}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700 w-full'
                  )}
                >
                  {window.ethereum ? 'Login Metamask' : 'Metamask not found'}
                </button>
              )}
            </Menu.Item>
          )}
        </Menu.Items>
      </DropdownTransition>
    </Menu>
  )
}
