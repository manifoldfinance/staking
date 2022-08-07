import { INFURA_ID } from '@/constants/chains';

import useWeb3Store from '@/hooks/useWeb3Store';
import normalizeChainId from '@/utils/normalizeChainId';
import type WalletConnectProvider from '@walletconnect/ethereum-provider';
import { UnsupportedChainIdError } from './walletconnect/metamask';

const __DEV__ = true;
export default class WalletConnectConnector {
  public wc?: WalletConnectProvider;

  readonly supportedChainIds: number[];

  constructor({ supportedChainIds }: { supportedChainIds: number[] }) {
    this.supportedChainIds = supportedChainIds;
  }

  private handleChainChanged = (chainId: string | number) => {
    if (__DEV__) {
      console.log('[handleChainChanged]', chainId);
    }

    window.location.reload();
  };

  private handleAccountsChanged = (accounts: string[]) => {
    if (__DEV__) {
      console.log('[handleAccountsChanged]', accounts);
    }

    useWeb3Store.setState({
      account: accounts[0],
    });
  };

  private handleDisconnect = (code: number, reason: string) => {
    if (__DEV__) {
      console.log('[handleDisconnect]', code, reason);
    }

    this.deactivate();
  };

  public activate = async () => {
    if (__DEV__) {
      console.log('[activate]');
    }

    const WalletConnectProvider = (
      await import('@walletconnect/ethereum-provider')
    ).default;

    const provider = new WalletConnectProvider({
      infuraId: INFURA_ID,
    });

    this.wc = provider;

    const accounts = await this.wc.enable();

    const account = accounts[0];

    const _chainId = this.wc.chainId;

    const chainId = normalizeChainId(_chainId);

    if (!!this.supportedChainIds && !this.supportedChainIds.includes(chainId)) {
      throw new UnsupportedChainIdError(chainId, this.supportedChainIds);
    }

    const Web3Provider = (await import('@ethersproject/providers'))
      .Web3Provider;

    const library = new Web3Provider(this.wc);

    library.pollingInterval = 12000;

    useWeb3Store.setState({
      connector: this,
      chainId: chainId,
      account: account,
      library: library,
    });

    if (this.wc.on) {
      this.wc.on('chainChanged', this.handleChainChanged);
      this.wc.on('accountsChanged', this.handleAccountsChanged);
      this.wc.on('disconnect', this.handleDisconnect);
    }
  };

  public deactivate = () => {
    if (__DEV__) {
      console.log('[deactivate]');
    }

    if (this.wc) {
      this.wc.removeListener('disconnect', this.handleDisconnect);
      this.wc.removeListener('chainChanged', this.handleChainChanged);
      this.wc.removeListener('accountsChanged', this.handleAccountsChanged);
      this.wc.disconnect();
    }
  };
}

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: [1, 4],
});
