import { SupportedChainId } from './chains';

export type FarmingPool = {
  address: string;
  name: string;
  pairs: string[];
  link: string;
};

export const FARMING_LP_SYMBOL = {
  [SupportedChainId.MAINNET]: 'SLP',
  [SupportedChainId.RINKEBY]: 'UNI-V2',
};

export const LP_FARMING_POOLS: Record<SupportedChainId, FarmingPool[]> = {
  [SupportedChainId.MAINNET]: [
    {
      address: '0xa914a9b9e03b6af84f9c6bd2e0e8d27d405695db',
      name: 'SushiSwap FOLD/WETH LP',
      pairs: ['FOLD', 'WETH'],
      link: 'https://analytics.sushi.com/pairs/0xa914a9b9e03b6af84f9c6bd2e0e8d27d405695db',
    },
    {
      address: '0xd084944d3c05cd115c09d072b9f44ba3e0e45921',
      name: 'SushiSwap FOLD/USDC LP',
      pairs: ['FOLD', 'USDC'],
      link: 'https://app.sushi.com/add/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/0xd084944d3c05CD115C09d072B9F44bA3E0E45921',
    },
  ],
  4: undefined
};
