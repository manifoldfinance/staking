import { DictatorDAO } from '@/contracts/types/DictatorDAO';
import { SupportedChainId } from '@/constants/chains';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { LP_EPOCH_REWARDS } from '@/constants/numbers';
import ERC20_ABI from '@/contracts/ERC20.json';
import type {
  ERC20,
  LPRewards,
  DOMODAO as DictatorDAO,
  UniswapV2Pair,
} from '@/contracts/types';
import UniswapV2Pair_ABI from '@/contracts/UniswapV2Pair.json';
import { Contract } from '@ethersproject/contracts';
import type { Web3Provider } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import useSWR from 'swr';
import { useFOLDUSDCRewards, useStaking } from './useContract';
import useXFOLDPrice from './useXFOLDPrice';
import useWeb3Store from './useWeb3Store';

function get(lpRewards: LPRewards, library: Web3Provider) {
  return async (_: string, chainId: number) => {
    const poolAddress = await lpRewards.depositLP();

    const uniswapV2Pair = new Contract(
      poolAddress,
      UniswapV2Pair_ABI,
      library.getSigner(),
    ) as UniswapV2Pair;

    const totalSupply = await uniswapV2Pair.totalSupply();

    const reserves = await uniswapV2Pair.getReserves();

    const [, reserve1] = reserves;

    const usdcReserve = parseFloat(
      formatUnits(reserve1, chainId === SupportedChainId.MAINNET ? 6 : 18),
    );

    const supply = parseFloat(formatUnits(totalSupply, 18));

    return (usdcReserve / supply) * 2;
  };
}

export function useFOLDUSDCLPPrice() {
  const library = useWeb3Store((state) => state.library);
  const chainId = useWeb3Store((state) => state.chainId);

  const lpRewards = useFOLDUSDCRewards();

  const shouldFetch = !!library && !!lpRewards && typeof chainId === 'number';

  return useSWR(
    shouldFetch ? ['FOLDUSDCLPPrice', chainId] : null,
    getFOLDUSDCLPPrice(lpRewards, library),
  );
}

function getFOLDUSDCLPRewardsAPY(lpRewards: LPRewards, library: Web3Provider) {
  return async (
    _: string,
    xfoldPrice: number,
    lpPrice: number,
    chainId: number,
  ) => {
    const poolAddress = await lpRewards.depositLP();

    const poolTokenContract = new Contract(
      poolAddress,
      ERC20_ABI,
      library.getSigner(),
    ) as ERC20;

    const totalStaked = await poolTokenContract.balanceOf(
      CONTRACT_ADDRESSES.DOMODAO[chainId],
    );

    const totalUSDValueStaked =
      parseFloat(formatUnits(totalStaked, 18)) * lpPrice;

    const totalRewards = LP_EPOCH_REWARDS * 52;

    const totalUSDRewards = totalRewards * xfoldPrice;

    const apy = (totalUSDRewards / totalUSDValueStaked) * 100;

    return apy;
  };
}

export function useFOLDUSDCLPRewardsAPY() {
  const library = useWeb3Store((state) => state.library);
  const chainId = useWeb3Store((state) => state.chainId);

  const lpRewards = useFOLDUSDCRewards();

  const { data: xfoldPrice } = useXFOLDPrice();
  const { data: lpPrice } = useFOLDUSDCLPPrice();

  const shouldFetch =
    !!lpRewards &&
    !!library &&
    typeof xfoldPrice === 'number' &&
    typeof lpPrice === 'number' &&
    typeof chainId === 'number';

  return useSWR(
    shouldFetch ? ['FOLDUSDCLPRewardsAPY', xfoldPrice, lpPrice, chainId] : null,
    getFOLDUSDCLPRewardsAPY(lpRewards, library),
  );
}

function getFOLDUSDCLPRewardsExpectedRewards(
  staking: DictatorDAO,
  lpRewards: LPRewards,
  library: Web3Provider,
) {
  return async (_: string, userAddress: string) => {
    const poolAddress = await lpRewards.depositLP();

    const poolTokenContract = new Contract(
      poolAddress,
      ERC20_ABI,
      library.getSigner(),
    ) as ERC20;

    const balanceLocked = await staking.balanceLocked(userAddress, poolAddress);

    const balanceOf = await poolTokenContract.balanceOf(staking.address);

    return (
      (parseFloat(formatUnits(balanceLocked, 18)) /
        parseFloat(formatUnits(balanceOf, 18))) *
      LP_EPOCH_REWARDS
    );
  };
}

export default function useFOLDUSDCLPRewardsExpectedRewards(
  userAddress: string,
) {
  const library = useWeb3Store((state) => state.library);

  const staking = useStaking();

  const lpRewards = useFOLDUSDCRewards();

  const shouldFetch =
    !!library && !!staking && !!lpRewards && typeof userAddress === 'string';

  return useSWR(
    shouldFetch ? ['FOLDUSDCLPRewardsExpectedRewards', userAddress] : null,
    getFOLDUSDCLPRewardsExpectedRewards(staking, lpRewards, library),
    {
      shouldRetryOnError: false,
    },
  );
}
