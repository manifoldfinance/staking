import { EPOCH_REWARDS } from '@/constants/numbers';
import { TOKEN_ADDRESSES } from '@/constants/tokens';
import type { ERC20 } from '@/contracts/types';
import { formatUnits, parseUnits } from '@ethersproject/units';
import useSWR from 'swr';
import { useTokenContract } from './useContract';
import useXFOLDPrice from './useXFOLDPrice';
//import useFoldPrice from './useFoldPrice';
import useWeb3Store from './useWeb3Store';

function getWrappingRewardsAPY(foldToken: ERC20) {
  return async (_: string, foldPrice: number, xfoldPrice: number) => {
    const totalSupply = await foldToken.totalSupply();

    const totalSupplyWithoutSeededSupply = totalSupply.sub(
      parseUnits('3000', 18),
    );

    const totalUSDValueFold =
      parseFloat(formatUnits(totalSupplyWithoutSeededSupply)) * foldPrice;

    const totalRewards = EPOCH_REWARDS * 52;

    const totalUSDRewards = totalRewards * xfoldPrice;

    const apy = (totalUSDRewards / totalUSDValueFold) * 100;

    return apy;
  };
}

// @FIXME useFoldPrice
function useFoldPrice(): { data: any } {
  throw new Error('Function not implemented.');
}

export default function useWrappingRewardsAPY() {
  const chainId = useWeb3Store((state) => state.chainId);

  const foldToken = useTokenContract(TOKEN_ADDRESSES.FOLD[chainId]);

  const { data: foldPrice } = useFoldPrice();
  const { data: xfoldPrice } = useXFOLDPrice();

  const shouldFetch =
    !!foldToken &&
    typeof chainId === 'number' &&
    typeof foldPrice === 'number' &&
    typeof xfoldPrice === 'number';

  return useSWR(
    shouldFetch ? ['WrappingRewardsAPY', foldPrice, xfoldPrice, chainId] : null,
    getWrappingRewardsAPY(foldToken),
  );
}
