import Button, { MaxButton } from '../button';
import { MIN_INPUT_VALUE, MaxUint256 } from '@/constants/numbers';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useFoldToken, useTokenContract } from '@/hooks/useContract';

import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import type { FormEvent } from 'react';
import NumericalInput from '../numericalInput';
import { TOKEN_ADDRESSES } from '@/constants/tokens';
import { TokenSingle } from '../tokenSelect';
import { TransactionToast } from '../customToast';
import handleError from '@/utils/handleError';
import toast from 'react-hot-toast';
import useFormattedBigNumber from '@/hooks/useFormattedBigNumber';
import useInput from '@/hooks/useInput';
import { useMemo } from 'react';
import useTokenAllowance from '@/hooks/view/useTokenAllowance';
import useTokenBalance from '@/hooks/view/useTokenBalance';
import useWeb3Store from '@/hooks/useWeb3Store';
import { useXFOLDStaked } from '@/hooks/view/usexFOLDStaked';

export default function DepositStake() {
  const account = useWeb3Store((state) => state.account);
  const chainId = useWeb3Store((state) => state.chainId);

  const FOLD_ERC20 = useFoldToken();

  const { data: xfoldBalance, mutate: xfoldBalanceMutate } = useTokenBalance(
    account,
    TOKEN_ADDRESSES.FOLD[chainId],
  );

  const { mutate: xfoldStakedMutate } = useXFOLDStaked();

  const formattedFOLDBalance = useFormattedBigNumber(xfoldBalance);

  const depositInput = useInput();

  const foldContract = useFoldToken();

  const { data: foldAllowance, mutate: xfoldAllowanceMutate } =
    useTokenAllowance(
      TOKEN_ADDRESSES.xFOLD[chainId],
      account,
      CONTRACT_ADDRESSES.DictatorDAO[chainId],
    );

  const foldNeedsApproval = useMemo(() => {
    if (!!foldAllowance && depositInput.hasValue) {
      return foldAllowance.isZero();
    }

    return;
  }, [foldAllowance, depositInput.hasValue]);

  async function mintXFOLD(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const _id = toast.loading('Waiting for confirmation');

    try {
      const depositAmount = depositInput.value;

      if (Number(depositAmount) <= MIN_INPUT_VALUE) {
        throw new Error(`Minium Deposit: ${MIN_INPUT_VALUE} FOLD`);
      }

      const amount = parseUnits(depositAmount);

      if (amount.gt(xfoldBalance)) {
        throw new Error(`Maximum Deposit: ${formattedFOLDBalance} FOLD`);
      }

      const transaction = await FOLD_ERC20.deposit(amount);

      depositInput.clear();

      toast.loading(
        <TransactionToast
          hash={transaction.hash}
          chainId={chainId}
          message={`Permit ${depositAmount} FOLD`}
        />,
        { id: _id },
      );

      await transaction.wait();

      toast.success(
        <TransactionToast
          hash={transaction.hash}
          chainId={chainId}
          message={`Mint ${depositAmount} xFOLD`}
        />,
        { id: _id },
      );

      xfoldStakedMutate();
      xfoldBalanceMutate();
    } catch (error) {
      handleError(error, _id);
    }
  }

  async function approveXFOLD() {
    const _id = toast.loading('Waiting for confirmation');

    try {
      const transaction = await foldContract.approve(
        CONTRACT_ADDRESSES.DictatorDAO[chainId],
        MaxUint256,
      );

      toast.loading(`Approve FOLD`, { id: _id });

      await transaction.wait();

      toast.success(`Approve FOLD`, { id: _id });

      xfoldAllowanceMutate();
    } catch (error) {
      handleError(error, _id);
    }
  }

  const inputIsMax =
    !!xfoldBalance && depositInput.value === formatUnits(xfoldBalance);

  const setMax = () => {
    depositInput.setValue(formatUnits(xfoldBalance));
  };

  return (
    <form onSubmit={mintXFOLD} method="POST" className="space-y-4">
      <div className="flex justify-between">
        <h2 className="font-medium leading-5">Unlock FOLD</h2>
      </div>

      <div>
        <div className="flex mb-2 space-x-4">
          <TokenSingle symbol="FOLD" />

          <div className="flex-1">
            <label className="sr-only" htmlFor="stakeDeposit">
              Permit FOLD to mint xFOLD
            </label>

            <NumericalInput
              id="stakeDeposit"
              name="stakeDeposit"
              required
              {...depositInput.valueBind}
            />
          </div>
        </div>

        <p className="h-5 text-sm text-gray-300">
          {xfoldBalance && formattedFOLDBalance ? (
            <>
              <span>{`Balance: ${formattedFOLDBalance} FOLD`}</span>{' '}
              {!inputIsMax && <MaxButton onClick={setMax} />}
            </>
          ) : null}
        </p>
      </div>

      <div className="space-y-4">
        {foldNeedsApproval && (
          <Button onClick={approveXFOLD}>
            {`Permit FOLD to mint and stake xFOLD`}
          </Button>
        )}

        <Button
          disabled={!depositInput.hasValue || foldNeedsApproval}
          type="submit"
        >
          {depositInput.hasValue ? 'Complete Staking' : 'Enter an amount'}
        </Button>
      </div>
    </form>
  );
}
