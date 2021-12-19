import type { ERC20, FOLD } from '@/contracts/types';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useFoldToken, useTokenContract } from './useContract';

import { EPOCH_REWARDS } from '@/constants/numbers';
import { TOKEN_ADDRESSES } from '@/constants/tokens';
import useSWR from 'swr';
import useWeb3Store from './useWeb3Store';

function getWrappingRewardsExpectedRewards(
  foldWrapper: FOLD,
  foldToken: ERC20,
) {
  return async (_: string, userAddress: string) => {
    const balanceLocked = await foldWrapper.balanceLocked(userAddress);

    const totalSupply = await foldToken.totalSupply();

    const totalSupplyWithoutSeededSupply = totalSupply.sub(
      parseUnits('3000', 18),
    );

    return (
      (parseFloat(formatUnits(balanceLocked, 18)) /
        parseFloat(formatUnits(totalSupplyWithoutSeededSupply, 18))) *
      EPOCH_REWARDS
    );
  };
}

export default function useWrappingRewardsExpectedRewards(userAddress: string) {
  const chainId = useWeb3Store((state) => state.chainId);

  const foldToken = useTokenContract(TOKEN_ADDRESSES.FOLD[chainId]);

  const foldWrapper = useFoldToken();

  const shouldFetch =
    !!foldWrapper && !!foldToken && typeof userAddress === 'string';

  return useSWR(
    shouldFetch ? ['WrappingRewardsExpectedRewards', userAddress] : null,
    getWrappingRewardsExpectedRewards(foldWrapper, foldToken),
    {
      shouldRetryOnError: false,
    },
  );
}
