import { SupportedChainId } from './chains';

export enum TokenNames {
  FOLD = 'FOLD',
  XFOLD = 'xFOLD',
  ETH = 'WETH',
  SLP = 'SLP',
  USDC = 'USDC',
}

type AddressMap = Record<SupportedChainId, string>;

type TokenAddresses = Partial<Record<TokenNames, AddressMap>>;

export const TOKEN_ADDRESSES: TokenAddresses = {
  [TokenNames.FOLD]: {
    [SupportedChainId.MAINNET]: '0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
    [SupportedChainId.RINKEBY]: '0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
  },
  [TokenNames.XFOLD]: {
    [SupportedChainId.MAINNET]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    [SupportedChainId.RINKEBY]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
};

export const TOKEN_NAMES_BY_ADDRESS: Record<string, keyof typeof TokenNames> = {
  '0xd084944d3c05CD115C09d072B9F44bA3E0E45921': 'FOLD',
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 'XFOLD',
  '0x57ab1ec28d129707052df4df418d58a2d46d5f51': 'USDC',
  '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb': 'ETH',
  '0x6a22e5e94388464181578aa7a6b869e00fe27846': 'SLP',
};

type TokenCategories = Partial<
  Record<TokenNames, 'CURRENCY' | 'CRYPTO' | 'COMMODITY'>
>;

export const TOKEN_CATEGORY_BY_SYMBOL: TokenCategories = {
  [TokenNames.FOLD]: 'CURRENCY',
  [TokenNames.USDC]: 'CURRENCY',
  [TokenNames.SLP]: 'CRYPTO',
  [TokenNames.ETH]: 'COMMODITY',
  [TokenNames.XFOLD]: 'COMMODITY',
};

export const TOKEN_COLORS = [
  'bg-green-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-yellow-500',
  'bg-indigo-500',
  'bg-pink-500',
];

export type TokenAsset = {
  address: string;
  decimals: number;
  symbol: string;
};

type TokenAssets = Partial<
  Record<TokenNames, Record<SupportedChainId, TokenAsset>>
>;

export const TOKEN_ASSETS: TokenAssets = {
  [TokenNames.XFOLD]: {
    [SupportedChainId.MAINNET]: {
      address: TOKEN_ADDRESSES[TokenNames.XFOLD][SupportedChainId.MAINNET],
      decimals: 18,
      symbol: TokenNames.XFOLD,
    },
    [SupportedChainId.RINKEBY]: {
      address: TOKEN_ADDRESSES[TokenNames.XFOLD][SupportedChainId.RINKEBY],
      decimals: 18,
      symbol: TokenNames.XFOLD,
    },
  },
  [TokenNames.FOLD]: {
    [SupportedChainId.MAINNET]: {
      address: TOKEN_ADDRESSES[TokenNames.FOLD][SupportedChainId.MAINNET],
      decimals: 18,
      symbol: TokenNames.FOLD,
    },
    [SupportedChainId.RINKEBY]: {
      address: TOKEN_ADDRESSES[TokenNames.FOLD][SupportedChainId.RINKEBY],
      decimals: 18,
      symbol: TokenNames.FOLD,
    },
  },
};

export const SUSHI_SWAP_LINKS: Partial<Record<TokenNames, string>> = {
  [TokenNames.FOLD]:
    'https://app.sushi.com/swap?outputCurrency=0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
  [TokenNames.XFOLD]:
    'https://app.sushi.com/swap?outputCurrency=0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
};

export const TOKEN_BUY_LINKS: Partial<Record<TokenNames, string>> = {
  [TokenNames.FOLD]:
    'https://app.sushi.com/swap?outputCurrency=0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
  [TokenNames.USDC]: '#',
  [TokenNames.ETH]: '#',
  [TokenNames.SLP]: '#',
  [TokenNames.XFOLD]: '#',
};
