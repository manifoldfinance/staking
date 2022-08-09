import create from 'zustand'
import { persist } from 'zustand/middleware'

import { getProvider } from './getProvider'

type MetamaskStore = {
  account?: string
  login: () => void
  logout: () => void
  handleAccountsChanged: (accounts: string[]) => void
}

export const useMetamaskStore = create(
  persist<MetamaskStore>(
    (set, get) => ({
      account: undefined,

      handleAccountsChanged(accounts) {
        set({ account: accounts[0] })
      },

      async login() {
        const provider = getProvider()
        if (!provider) return

        const accounts = await provider
          .send('wallet_requestPermissions', [
            {
              eth_accounts: {},
            },
          ])
          .then(() => provider.send('eth_requestAccounts', []))

        const { handleAccountsChanged } = get()

        handleAccountsChanged(accounts)
      },

      async logout() {
        set({ account: undefined })
      },
    }),
    {
      name: 'metamask',
      getStorage: () => localStorage,
    }
  )
)
