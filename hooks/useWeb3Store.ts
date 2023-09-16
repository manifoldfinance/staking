/**
 * @constant State
 * @since 0.8.0
 */
import type MetaMaskConnector from '@/lib/connectors/metamask';
import type WalletConnectConnector from '@/lib/connectors/walletconnect';
import type { Web3Provider } from '@ethersproject/providers';
import create from 'zustand';
import { omit } from 'omit-ts';
import { useLayoutEffect } from 'react'

import createContext from 'zustand/context'

let store

//const getDefaultInitialState = () => ({
  //lastUpdate: Date.now(),
  //light: false,
  //count: 0,
//})

const zustandContext = createContext()

export const Provider = zustandContext.Provider
// An example of how to get types
/** @type {import('zustand/index').UseStore<typeof initialState>} */
export const useStore = zustandContext.useStore

export type State = {
  account?: string;
  chainId?: number;
  connector?: MetaMaskConnector | WalletConnectConnector;
  library?: Web3Provider;
  active: boolean;
  reset: () => void;
};

const useWeb3Store = create<State>((set, get) => ({
  /*
...getDefaultInitialState(),
    ...preloadedState,
    tick: (lastUpdate, tx) => {
      set({
        lastUpdate,
        tx: !!mined,
      })
    },
    increment: () => {
      set({
        status: get().count + 1,
      })
    },
    decrement: () => {
      set({
        status: get().count - 1,
      })
    },
      */
  active:
    get()?.connector !== undefined &&
    get()?.chainId !== undefined &&
    get()?.account !== undefined,
  reset: () =>
    set(
//{
      (state) => omit(state, ['account', 'chainId', 'connector', 'library']),
      true,
  //   web3: getDefaultInitialState().web3
//}
),
}));

export function useCreateStore(serverInitialState) {
  // Server side code: For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(serverInitialState)
  }
  // End of server side code

  // Client side code:
  // Next.js always re-uses same store regardless of whether page is a SSR or SSG or CSR type.
  const isReusingStore = Boolean(store)
  store = store ?? initializeStore(serverInitialState)
  // When next.js re-renders _app while re-using an older store, then replace current state with
  // the new state (in the next render cycle).
  // (Why next render cycle? Because react cannot re-render while a render is already in progress.
  // i.e. we cannot do a setState() as that will initiate a re-render)
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment (i.e. client or server)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
    // states on CSR page navigation or not. I have chosen not to, but if you choose to,
    // then add `serverInitialState = getDefaultInitialState()` here.
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...store.getState(),
          // but reset all other properties.
          ...serverInitialState,
        },
        true // replace states, rather than shallow merging
      )
    }
  })

  return () => store
}

export default useWeb3Store;
/** @export useWeb3Store  */
