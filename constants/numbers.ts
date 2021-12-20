import { SupportedChainId } from './chains';

// 604800 = 7 Days
// 86400 = 1 days
export const EPOCH_DURATION = 86400;

/**
 * example: export const EPOCH_REWARDS = 2403846.153;

 */
export const EPOCH_REWARDS = 0;

/**
 *LP Rewards
 * example: export const LP_EPOCH_REWARDS = 96153.84;
 */
export const LP_EPOCH_REWARDS = 0;

export const DAO_THRESHOLD = {
  [SupportedChainId.MAINNET]: 100_000,
  // [SupportedChainId.RINKEBY]: 100_000,
};

export const MaxUint256 = BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);

export const MIN_INPUT_VALUE = 1;

export const MAX_FOLD_MINTABLE = 2_000_000;
