import useWeb3Store from '@/hooks/useWeb3Store';
import normalizeChainId from '@/utils/normalizeChainId';
import detectEthereumProvider from '@metamask/detect-provider';
import type {
  IEthereumProvider,
  ProviderAccounts,
  ProviderChainId,
  ProviderRpcError,
} from 'eip1193-provider';

const __DEV__ = true;
export class NoEthereumProviderError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'No Ethereum provider found';
  }
}

export class UnsupportedChainIdError extends Error {
  public constructor(
    unsupportedChainId: number,
    supportedChainIds?: readonly number[],
  ) {
    super();
    this.name = this.constructor.name;
    this.message = `Unsupported chain id: ${unsupportedChainId}. Supported chain ids are: ${supportedChainIds}.`;
  }
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'The user rejected the request.';
  }
}

export class UnsupportedProviderError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'Connect to site  / This provider is not supported.';
  }
}

export default class MetaMaskConnector {
  readonly supportedChainIds: number[];

  constructor({ supportedChainIds }: { supportedChainIds: number[] }) {
    this.supportedChainIds = supportedChainIds;
  }

  private handleChainChanged = (chainId: ProviderChainId) => {
    if (__DEV__) {
      console.log('[handleChainChanged]', chainId);
    }

    window.location.reload();
  };

  private handleAccountsChanged = (accounts: ProviderAccounts) => {
    if (__DEV__) {
      console.log('[handleAccountsChanged]', accounts);
    }

    useWeb3Store.setState({
      account: accounts[0],
    });
  };

  private handleDisconnect = (error: ProviderRpcError) => {
    if (__DEV__) {
      console.log('[handleDisconnect]', error);
    }

    this.deactivate();
  };

  public activate = async () => {
    if (__DEV__) {
      console.log('[activate]');
    }

    const provider = (await detectEthereumProvider()) as IEthereumProvider;

    if (!provider) {
      throw new NoEthereumProviderError();
    }

    let accounts: ProviderAccounts;

    try {
      accounts = (await provider.request({
        method: 'eth_requestAccounts',
      })) as ProviderAccounts;
    } catch (error) {
      if ((error as any).code === 4001) {
        throw new UserRejectedRequestError();
      }

      console.log(
        'eth_requestAccounts was unsuccessful, falling back to enable',
      );
    }

    if (!accounts) {
      try {
        accounts = await provider.enable();
      } catch (error) {
        if ((error as any).code === 4001) {
          throw new UserRejectedRequestError();
        }

        console.log('enable was unsuccessful');

        throw new UnsupportedProviderError();
      }
    }

    const account = accounts[0];

    let _chainId: string;

    try {
      _chainId = (await provider.request({ method: 'eth_chainId' })) as string;
    } catch {
      console.log('eth_chainId was unsuccessful, falling back to net_version');
    }

    if (!_chainId) {
      try {
        _chainId = (provider as any).send({ method: 'net_version' })
          ?.result as string;
      } catch {
        console.log('net_version v2 was unsuccessful');

        throw new UnsupportedProviderError();
      }
    }

    const chainId = normalizeChainId(_chainId as string);

    if (!!this.supportedChainIds && !this.supportedChainIds.includes(chainId)) {
      throw new UnsupportedChainIdError(chainId, this.supportedChainIds);
    }

    const Web3Provider = (await import('@ethersproject/providers'))
      .Web3Provider;

    const library = new Web3Provider(provider);

    library.pollingInterval = 12000;

    useWeb3Store.setState({
      connector: this,
      chainId: chainId,
      account: account,
      library: library,
    });

    if (provider.on) {
      provider.on('chainChanged', this.handleChainChanged);
      provider.on('accountsChanged', this.handleAccountsChanged);
      provider.on('disconnect', this.handleDisconnect);
    }
  };

  public deactivate = () => {
    if (__DEV__) {
      console.log('[deactivate]');
    }

    if ((window as any).ethereum && (window as any).ethereum.removeListener) {
      (window as any).ethereum.removeListener(
        'chainChanged',
        this.handleChainChanged,
      );
      (window as any).ethereum.removeListener(
        'accountsChanged',
        this.handleAccountsChanged,
      );
      (window as any).ethereum.removeListener(
        'disconnect',
        this.handleDisconnect,
      );
    }
  };

  public isAuthorized = async () => {
    if (!window.ethereum) {
      return false;
    }

    try {
      const provider = (await detectEthereumProvider()) as IEthereumProvider;

      return await provider
        .request({
          method: 'eth_requestAccounts',
        })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            return true;
          } else {
            return false;
          }
        });
    } catch {
      return false;
    }
  };
}

export const injected = new MetaMaskConnector({
  supportedChainIds: [1, 4],
});
