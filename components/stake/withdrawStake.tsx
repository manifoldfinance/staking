import Button, { MaxButton } from '../button';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { getxFOLDStaked, useXFOLDStaked } from '@/hooks/view/usexFOLDStaked';
import { useMemo } from 'react';
import type { FormEvent } from 'react';
import { MIN_INPUT_VALUE } from '@/constants/numbers';
import NumericalInput from '../numericalInput';
import { TOKEN_ADDRESSES } from '@/constants/tokens';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { TokenSingle } from '../tokenSelect';
import { TransactionToast } from '../customToast';
import dayjs from 'dayjs';
import handleError from '@/utils/handleError';
import relativeTime from 'dayjs/plugin/relativeTime';
import toast from 'react-hot-toast';
import {
  useDictatorDAO,
  useOperatorAddress,
  useFoldToken,
} from '@/hooks/useContract';
import useFormattedBigNumber from '@/hooks/useFormattedBigNumber';
import useInput from '@/hooks/useInput';
import useTokenAllowance from '@/hooks/view/useTokenAllowance';
import useTokenBalance from '@/hooks/view/useTokenBalance';
import useWeb3Store from '@/hooks/useWeb3Store';
import { ethers } from 'ethers';

dayjs.extend(relativeTime);

export default function WithdrawStake() {
  const account = useWeb3Store((state) => state.account);
  const chainId = useWeb3Store((state) => state.chainId);

  const { mutate: xfoldBalanceMutate } = useTokenBalance(
    account,
    TOKEN_ADDRESSES.xFOLD[chainId],
  );

  const { data: xfoldStaked, mutate: xfoldStakedMutate } = useXFOLDStaked();

  const DOMO_DAO = useDictatorDAO();
  const FOLD_ERC20 = useFoldToken();

  const withdrawInput = useInput();

  const formattedXFOLDStaked = useFormattedBigNumber(xfoldStaked);


  const { data: xfoldAllowance, mutate: xfoldAllowanceMutate } =
    useTokenAllowance(
      CONTRACT_ADDRESSES.DictatorDAO[chainId],
      account,
      TOKEN_ADDRESSES.FOLD[chainId],
    );

    const convertedxFoldAllowance = xfoldAllowance ? ethers.utils.formatEther(xfoldAllowance) : "0";
  
    const xfoldNeedsApproval = useMemo(() => {
      if (parseFloat(convertedxFoldAllowance) < parseFloat(withdrawInput.value) && withdrawInput.hasValue) {
        return true;
      }
  
      return;
    }, [withdrawInput.value, convertedxFoldAllowance, withdrawInput.hasValue]);

  async function withdrawXFOLD(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const _id = toast.loading('Waiting for confirmation');

    try {
      const withdrawAmount = withdrawInput.value;

      if (Number(withdrawAmount) <= MIN_INPUT_VALUE) {
        throw new Error(`Minimum Withdraw: ${MIN_INPUT_VALUE} XFOLD`);
      }

      const amount = parseUnits(withdrawAmount);

      if (amount.gt(xfoldStaked)) {
        throw new Error(`Maximum Withdraw: ${formattedXFOLDStaked} XFOLD`);
      }

      withdrawInput.clear();

      const transaction = await DOMO_DAO.burn(account, amount);

      // const transaction = await XFOLD.burn(
      //   // @ts-ignore
      //   to,
      //   // @ts-ignore
      //   shares,
      // );

      toast.loading(
        <TransactionToast
          hash={transaction.hash}
          chainId={chainId}
          message={`Withdrawing ${withdrawAmount} FOLD`}
        />,
        { id: _id },
      );

      await transaction.wait();

      toast.success(
        <TransactionToast
          hash={transaction.hash}
          chainId={chainId}
          message={`Withdrew ${withdrawAmount} FOLD`}
        />,
        { id: _id },
      );

      xfoldStakedMutate();
      xfoldBalanceMutate();
    } catch (error) {
      handleError(error, _id);
    }
  }

  const inputIsMax =
    !!xfoldStaked && withdrawInput.value === formatUnits(xfoldStaked);

  const setMax = () => {
    withdrawInput.setValue(formatUnits(xfoldStaked));
  };

  async function approveXFOLD() {
    const _id = toast.loading('Waiting for confirmation');

    const depositAmount = withdrawInput.value;

    if (Number(depositAmount) <= MIN_INPUT_VALUE) {
      throw new Error(`Minimum Withdraw: ${MIN_INPUT_VALUE} XFOLD`);
    }

    const amount = parseUnits(depositAmount);

    if (amount.gt(xfoldStaked)) {
      throw new Error(`Maximum Withdraw: ${formattedXFOLDStaked} XFOLD`);
    }

    try {
      const transaction = await DOMO_DAO.approve(
        CONTRACT_ADDRESSES.FOLD[chainId],
        amount,
      );

      toast.loading(`Approve XFOLD`, { id: _id });

      await transaction.wait();

      toast.success(`Approve XFOLD`, { id: _id });

      xfoldAllowanceMutate();
    } catch (error) {
      handleError(error, _id);
    }
  };

  return (
    <form method="POST" onSubmit={withdrawXFOLD} className="space-y-4">
      <div className="flex justify-between">
        <h2 className="font-medium leading-5">Withdraw Stake</h2>
      </div>

      <div>
        <div className="flex space-x-4 mb-2">
          <TokenSingle symbol="xFOLD" />

          <div className="flex-1">
            <label className="sr-only" htmlFor="stakeWithdraw">
              Amount to unstake
            </label>

            <NumericalInput
              id="stakeWithdraw"
              name="stakeWithdraw"
              required
              {...withdrawInput.valueBind}
            />
          </div>
        </div>

        <p className="text-sm text-gray-300 h-5">
          {xfoldStaked && formattedXFOLDStaked ? (
            <>
              <span>{`Available: ${formattedXFOLDStaked} xFOLD`}</span>{' '}
              {!inputIsMax && <MaxButton onClick={setMax} />}
            </>
          ) : null}
        </p>
      </div>
      <div className="space-y-4">
        {xfoldNeedsApproval && (
          <Button onClick={approveXFOLD}>
            {`Permit FOLD to withdraw`}
          </Button>
        )}
        </div>

      <div className="space-y-4">
        <Button type="submit" disabled={!withdrawInput.hasValue || xfoldNeedsApproval}>
          {withdrawInput.hasValue ? 'Withdraw' : 'Enter an amount'}
        </Button>
      </div>
    </form>
  );
}
