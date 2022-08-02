import create from 'zustand';
import { persist } from 'zustand/middleware';

export type State = {
  isOpen: boolean;
  account?: string
  open: () => void;
  close: () => void;
  toggle: () => void;
  handleAccountsChanged: (accounts: string[]) => void
};

const useWalletModal = create<State>((set, get) => ({
  isOpen: false,
  account: undefined,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
  handleAccountsChanged(accounts) {
  set({ account: accounts[0] })
},
}));

export default useWalletModal;
/**

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
*/
