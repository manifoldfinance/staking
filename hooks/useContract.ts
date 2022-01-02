import type {
  DOMODAO,
  DOMODAO as DictatorDAO,
  ERC20,
  FOLD,
} from '@/contracts/types';
import useWeb3Store, { State } from './useWeb3Store';

import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { Contract } from 'ethers';
import DOMODAO_ABI from '@/contracts/DictatorDAO.json';
import ERC20_ABI from '@/contracts/ERC20.json';
import FOLD_ABI from '@/contracts/FOLD.json';
import STAKING_ABI from '@/contracts/Staking.json';
import { useMemo } from 'react';
import { AddressZero } from '@ethersproject/constants';
import { Staking } from '@/contracts/types/Staking';

const chainIdSelector = (state: State) => state.chainId;
const accountSelector = (state: State) => state.account;
const librarySelector = (state: State) => state.library;

export default function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any,
): T | null {
  const account = useWeb3Store(accountSelector);
  const library = useWeb3Store(librarySelector);

  return useMemo(() => {
    if (!address || address === AddressZero || !ABI || !library) return null;
    try {
      return new Contract(address, ABI, library.getSigner(account));
    } catch (error) {
      console.error('Failed To Get Contract', error);

      return null;
    }
  }, [address, ABI, library, account]) as T;
}

export function useTokenContract(tokenAddress?: string) {
  return useContract<ERC20>(tokenAddress, ERC20_ABI);
}

export function useOperatorAddress() {
  const chainId = useWeb3Store(chainIdSelector);

  return useContract<DOMODAO>(
    CONTRACT_ADDRESSES.Operator[chainId],
    DOMODAO_ABI,
  );
}

export function useFoldToken() {
  const chainId = useWeb3Store(chainIdSelector);

  return useContract<FOLD>(CONTRACT_ADDRESSES.FOLD[chainId], FOLD_ABI);
}

export function useDictatorDAO() {
  const chainId = useWeb3Store(chainIdSelector);

  return useContract<DictatorDAO>(
    CONTRACT_ADDRESSES.DictatorDAO[chainId],
    DOMODAO_ABI,
  );
}

// TODO - useFutureDate, getBalanceOf = calculate user
export function useFOLDUSDCRewards() {
  const chainId = useWeb3Store(chainIdSelector);

  return useContract<FOLD>(CONTRACT_ADDRESSES.FOLD[chainId], FOLD_ABI);
}

// TODO - getBalanceOf
export function useStaking() {
  const chainId = useWeb3Store(chainIdSelector);

  return useContract<Staking>(CONTRACT_ADDRESSES.XFOLD[chainId], STAKING_ABI);
}

export function useStakingContract() {
  const chainId = useWeb3Store(chainIdSelector);

  return useContract<Staking>(CONTRACT_ADDRESSES.XFOLD[chainId], STAKING_ABI);
}
