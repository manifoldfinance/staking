import type { LPRewards, UniswapV2Pair } from '@/contracts/types';
import UniswapV2Pair_ABI from '@/contracts/UniswapV2Pair.json';
import { getETHPrice } from '@/lib/coingecko';
import { Contract } from '@ethersproject/contracts';
import type { Web3Provider } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import useSWR from 'swr';
import { useFOLDUSDCRewards } from './useContract';
import useWeb3Store from './useWeb3Store';

function getXFOLDPrice(lpRewards: LPRewards, library: Web3Provider) {
  return async () => {
    const poolAddress = await lpRewards.depositLP();

    const uniswapV2Pair = new Contract(
      poolAddress,
      UniswapV2Pair_ABI,
      library.getSigner(),
    ) as UniswapV2Pair;

    const reserves = await uniswapV2Pair.getReserves();

    const [reserve0, reserve1] = reserves;

    const xfoldReserve = parseFloat(formatUnits(reserve0, 18));
    const wethReserve = parseFloat(formatUnits(reserve1, 18));

    const xfoldWethPrice = wethReserve / xfoldReserve;

    const ethPrice = await getETHPrice();

    const xfoldPrice = xfoldWethPrice * ethPrice;

    return xfoldPrice;
  };
}

export default function useXFOLDPrice() {
  const library = useWeb3Store((state) => state.library);
  const chainId = useWeb3Store((state) => state.chainId);

  const lpRewards = useFOLDUSDCRewards();

  const shouldFetch = !!library && !!lpRewards && typeof chainId === 'number';

  return useSWR(
    shouldFetch ? ['XFOLDPrice', chainId] : null,
    // @ts-ignore
    getXFOLDPrice(lpRewards, library),
  );
}
