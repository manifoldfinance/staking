import Button, { BuyLink, MaxButton } from '../button';
import {
  MAX_FOLD_MINTABLE,
  MIN_INPUT_VALUE,
  MaxUint256,
} from '@/constants/numbers';
import TokenSelect, { Token } from '../tokenSelect';
import { commify, formatUnits, parseUnits } from '@ethersproject/units';
import { useDictatorDAO, useTokenContract } from '@/hooks/useContract';
import { useMemo, useState } from 'react';

import { BigNumber } from '@ethersproject/bignumber';
import { BigNumberish } from 'ethers';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { DOMODAO } from '@/contracts/types';
import type { FormEvent } from 'react';
import NumericalInput from '../numericalInput';
import { Popover } from '@headlessui/react';
import { Settings } from 'react-feather';

import { TOKEN_ADDRESSES } from '@/constants/tokens';
import { TransactionToast } from '../customToast';
import handleError from '@/utils/handleError';
import toast from 'react-hot-toast';
import useBestBuy from '@/hooks/useBestBuy';
import useFormattedBigNumber from '@/hooks/useFormattedBigNumber';
import useGetFoldAmountOut from '@/hooks/view/useGetxFOLDAmountOut';
import useGetPoolTokens from '@/hooks/view/useGetPoolTokens';
import useInput from '@/hooks/useInput';
import { useOperatorAddress } from '../../hooks/useContract';
import useTokenAllowance from '@/hooks/view/useTokenAllowance';
import useTokenBalance from '@/hooks/view/useTokenBalance';
import useTotalSupply from '@/hooks/useTotalSupply';
import useWeb3Store from '@/hooks/useWeb3Store';

export default function Deposit() {
  const account = useWeb3Store((state) => state.account);
  const chainId = useWeb3Store((state) => state.chainId);

  const stakingRouter = useDictatorDAO();

  const { mutate: bestBuyMutate } = useBestBuy();

  const { data: poolTokens } = useGetPoolTokens();

  const { mutate: foldBalanceMutate } = useTokenBalance(
    account,
    TOKEN_ADDRESSES.xFOLD[chainId],
  );

  const { data: totalSupply, mutate: totalSupplyMutate } = useTotalSupply(
    TOKEN_ADDRESSES.xFOLD[chainId],
  );

  const formattedTotalSupply = useFormattedBigNumber(totalSupply, 0);

  const [mintToken, mintTokenSet] = useState<Token>();

  const mintTokenContract = useTokenContract(mintToken?.address);

  const { data: mintTokenBalance, mutate: mintTokenBalanceMutate } =
    useTokenBalance(account, mintToken?.address);
  const { data: mintTokenAllowance, mutate: mintTokenAllowanceMutate } =
    useTokenAllowance(
      mintToken?.address,
      account,
      CONTRACT_ADDRESSES.Staking[chainId],
    );

  const formattedDepositBalance = useFormattedBigNumber(mintTokenBalance, 4);

  const mintInput = useInput();
  const slippageInput = useInput();
  const liquidationFeeInput = useInput();

  const mintTokenNeedsApproval = useMemo(() => {
    if (!!mintTokenAllowance && mintInput.hasValue) {
      return mintTokenAllowance.isZero();
    }

    return;
  }, [mintTokenAllowance, mintInput.hasValue]);

  const { data: foldAmountOut } = useGetFoldAmountOut(
    mintInput?.value,
    mintToken?.address,
  );

  // @ts-ignore
  const formattedFoldAmountOut = useFormattedBigNumber(foldAmountOut);

  async function tokenDeposit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const _id = toast.loading('Waiting for confirmation');

    try {
      const mintAmount = mintInput.value;

      if (Number(mintAmount) <= MIN_INPUT_VALUE) {
        throw new Error(
          `Minium Deposit: ${MIN_INPUT_VALUE} ${mintToken.symbol}`,
        );
      }

      const tokenAmountIn = parseUnits(mintAmount);

      const liquidationFeeBigNumber = liquidationFeeInput.hasValue
        ? BigNumber.from(Number(liquidationFeeInput.value) * 10000)
        : BigNumber.from(10 * 10000);

      const slippage = slippageInput.hasValue ? slippageInput.value : '1';

      const poolBalance: BigNumber = await mintTokenContract.balanceOf(
        CONTRACT_ADDRESSES.Staking[chainId],
      );

      const maxDeposit = poolBalance.div(3);

      if (tokenAmountIn.gt(maxDeposit)) {
        const fmMaxDeposit = parseFloat(formatUnits(maxDeposit)).toFixed(2);

        throw new Error(`Maximum Deposit: ${fmMaxDeposit} ${mintToken.symbol}`);
      }

      // @ts-ignore
      const transaction = await stakingRouter.mint(amount, useOperatorAddress);
      //mintInput.clear();

      toast.loading(
        <TransactionToast
          message={`Deposit ${mintAmount} ${mintToken.symbol}`}
          chainId={chainId}
          hash={transaction.hash}
        />,
        { id: _id },
      );

      await transaction.wait();

      toast.success(
        <TransactionToast
          message={`Deposit ${mintAmount} ${mintToken.symbol}`}
          chainId={chainId}
          hash={transaction.hash}
        />,
        { id: _id },
      );

      foldBalanceMutate();
      mintTokenBalanceMutate();
      totalSupplyMutate();
      bestBuyMutate();
    } catch (error) {
      handleError(error, _id);
    }
  }

  async function approveDepositToken() {
    const _id = toast.loading('Waiting for confirmation');

    try {
      const transaction = await mintTokenContract.approve(
        CONTRACT_ADDRESSES.Staking[chainId],
        MaxUint256,
      );

      toast.loading(`Approve ${mintToken.symbol}`, { id: _id });

      await transaction.wait();

      toast.success(`Approve ${mintToken.symbol}`, { id: _id });

      mintTokenAllowanceMutate();
    } catch (error) {
      handleError(error, _id);
    }
  }

  const inputIsMax =
    !!mintTokenBalance && mintInput.value === formatUnits(mintTokenBalance);

  const setMax = () => {
    mintInput.setValue(formatUnits(mintTokenBalance));
  };

  return (
    <form className="space-y-4" onSubmit={tokenDeposit}>
      <div className="flex justify-between">
        <h2 className="font-medium leading-5">Mint xFOLD</h2>

        <Popover className="relative">
          <Popover.Button className="block w-5 h-5 text-gray-300 focus:outline-none hover:text-opacity-80">
            <Settings size={20} />
          </Popover.Button>

          <Popover.Panel
            className="absolute right-0 z-10 px-4 mt-3 w-64 sm:px-0"
            unmount={false}
          >
            <div className="relative p-4 rounded-lg ring-1 ring-inset ring-white ring-opacity-20 bg-primary-300">
              <div className="space-y-4">
                <p className="leading-none">Advanced</p>

                <div>
                  <label
                    className="block mb-2 text-sm text-gray-300"
                    htmlFor="slippage"
                  >
                    Zap
                  </label>

                  <div className="flex px-3 py-1 rounded-md bg-primary focus-within:ring-4">
                    <input
                      autoComplete="off"
                      autoCorrect="off"
                      inputMode="numeric"
                      id="slippage"
                      name="slippage"
                      min={0}
                      max={99}
                      step={1}
                      placeholder="1"
                      className="hide-number-input-arrows w-full text-right appearance-none bg-transparent focus:outline-none mr-0.5 text-white"
                      spellCheck="false"
                      type="number"
                      {...slippageInput.eventBind}
                    />

                    <span>%</span>
                  </div>
                </div>

                <div>
                  <label
                    className="block mb-2 text-sm text-gray-300"
                    htmlFor="liquidationFee"
                  >
                    Liquidity Position Price
                  </label>

                  <div className="flex px-3 py-1 rounded-md bg-primary focus-within:ring-4">
                    <input
                      autoComplete="off"
                      autoCorrect="off"
                      inputMode="numeric"
                      id="liquidationFee"
                      name="liquidationFee"
                      placeholder="10"
                      step={0.1}
                      max={10}
                      min={0}
                      className="hide-number-input-arrows w-full text-right appearance-none bg-transparent focus:outline-none mr-0.5 text-white"
                      spellCheck="false"
                      type="number"
                      {...slippageInput.eventBind}
                    />

                    <span>%</span>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>

      <div>
        <div className="flex mb-2 space-x-4">
          <TokenSelect
            value={mintToken}
            onChange={mintTokenSet}
            tokens={poolTokens}
            order="DESC"
          />

          <div className="flex-1">
            <label className="sr-only" htmlFor="mintAmount">
              Enter amount of token
            </label>

            <NumericalInput
              name="mintAmount"
              id="mintAmount"
              required
              {...mintInput.valueBind}
            />
          </div>
        </div>

        <p className="h-5 text-sm text-gray-300">
          {!!mintToken && mintTokenBalance && formattedDepositBalance ? (
            <>
              <span>{`Balance: ${formattedDepositBalance} ${mintToken.symbol}`}</span>{' '}
              {!inputIsMax && !mintTokenBalance.isZero() && (
                <MaxButton onClick={setMax} />
              )}
              {mintTokenBalance.isZero() && (
                <BuyLink tokenSymbol={mintToken.symbol} />
              )}
            </>
          ) : null}
        </p>
      </div>

      <div className="w-full h-px bg-primary-300" />

      <div className="flex justify-between">
        <p className="leading-none">xFOLD Received</p>

        <p className="leading-none">
          {formattedFoldAmountOut === '0.00' ? `-` : formattedFoldAmountOut}
        </p>
      </div>

      <div className="flex justify-between">
        <p className="leading-none">xFOLD Supply</p>

        <p className="leading-none">{`${formattedTotalSupply} / ${commify(
          MAX_FOLD_MINTABLE,
        )}`}</p>
      </div>

      <div className="space-y-4">
        {mintTokenNeedsApproval && (
          <Button onClick={approveDepositToken}>
            {`Approve FOLD to mint  Your ${mintToken.symbol}`}
          </Button>
        )}


        <Button
          type="submit"
        >
          {mintInput.hasValue && !!mintToken ? `Deposit` : `Enter an amount`}
        </Button>
      </div>
    </form>
  );
}

/**
                                const allowance = parseFloat(formatUnits(
                                    await tokenContractWithSigner.allowance(account, misoWithSigner.address), 
                                    await tokenContractWithSigner.decimals()
                                ));
                                if (allowance > tokenAmount) {
                                    alert('You already approved the contract, please commit!');
                                    return;
                                }
 */
function amount(
  amount: any,
  BigNumberish: any,
  operatorVote: any,
  string: any,
) {
  throw new Error('Function not implemented.');
}
