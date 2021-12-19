import { EPOCH_REWARDS } from '@/constants/numbers';
import { TOKEN_ADDRESSES } from '@/constants/tokens';
import type { ERC20, FoldWrapper } from '@/contracts/types';
import { formatUnits, parseUnits } from '@ethersproject/units';
import useSWR from 'swr';
import { useFoldWrapper, useTokenContract } from './useContract';
import useWeb3Store from './useWeb3Store';

function getWrappingRewardsExpectedRewards(
  foldWrapper: FoldWrapper,
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

  const foldWrapper = useFoldWrapper();

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
