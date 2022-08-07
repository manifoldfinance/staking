import { DictatorDAO } from './shared/DictatorDAO.d';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { TOKEN_ADDRESSES } from '@/constants/tokens';
import { ERC20, FOLD, DOMODAO } from '@/contracts/types';
import { BigNumber } from '@ethersproject/bignumber';
import useSWR from 'swr';
import { useTokenContract } from './shared/useContract';
import useWeb3Store from './shared/useWeb3Store';
import useTokenBalance from './useGetTokenAmountOut/useTokenBalance';

function getGetTokenAmountOut(
  poolDictatorDao: DOMODAO,
  burnTokenContract: ERC20,
) {
  return async (
    _: string,
    burnToken: string,
    foldAmountIn: BigNumber,
    chainId: number,
  ) => {
    const getTokenAmountOutBurn = await poolDictatorDao.burn(
      burnToken,
      foldAmountIn,
    );

    const poolBalance = await burnTokenContract.balanceOf(
      CONTRACT_ADDRESSES[chainId],
    );

    const maxWithdraw = poolBalance.div(3);

    if (getTokenAmountOutBurn.hash) {
      return maxWithdraw;
    }

    return getTokenAmountOutBurn;
  };
}

export default function useGetTokenAmountOut(burnToken: string) {
  const account = useWeb3Store((state) => state.account);
  const chainId = useWeb3Store((state) => state.chainId);

  const { data: foldBalance } = useTokenBalance(
    account,
    TOKEN_ADDRESSES.FOLD[chainId],
  );

  const poolDictatorDao = DictatorDAO;

  const burnTokenContract = useTokenContract(burnToken);

  const shouldFetch =
    !!poolDictatorDao &&
    !!burnTokenContract &&
    !!foldBalance &&
    typeof burnToken === 'string';

  return useSWR(
    shouldFetch ? ['GetTokenAmountOut', burnToken, foldBalance, chainId] : null,
    // @ts-ignore
    getGetTokenAmountOut(burnToken, burnTokenContract),
  );
}
