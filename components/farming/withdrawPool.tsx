import Button, { MaxButton } from '@/components/button';
import NumericalInput from '@/components/numericalInput';
import { TokenPair } from '@/components/tokenSelect';
import { FarmingPool, FARMING_LP_SYMBOL } from '@/constants/farming';
import { MIN_INPUT_VALUE } from '@/constants/numbers';
import { useStaking } from '@/hooks/useContract';
import useFormattedBigNumber from '@/hooks/useFormattedBigNumber';
import useInput from '@/hooks/useInput';
import useWeb3Store from '@/hooks/useWeb3Store';
import useStakingBalanceLocked from '@/hooks/view/useStakingBalanceLocked';
import useTokenBalance from '@/hooks/view/useTokenBalance';
import handleError from '@/utils/handleError';
import { formatUnits, parseUnits } from '@ethersproject/units';
import type { FormEvent } from 'react';
import { ExternalLink } from 'react-feather';
import toast from 'react-hot-toast';
import { TransactionToast } from '../customToast';

export default function WithdrawPool({ pool }: { pool: FarmingPool }) {
  const account = useWeb3Store((state) => state.account);
  const chainId = useWeb3Store((state) => state.chainId);

  const staking = useStaking();

  const withdrawInput = useInput();

  const { mutate: poolTokenBalanceMutate } = useTokenBalance(
    account,
    pool?.address,
  );

  const { data: poolTokenBalanceLocked, mutate: poolTokenBalanceLockedMutate } =
    useStakingBalanceLocked(account, pool?.address);

  const fmPoolTokenBalanceLocked = useFormattedBigNumber(
    poolTokenBalanceLocked,
    4,
  );

  async function withdrawPoolToken(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const _id = toast.loading('Waiting for confirmation');

    try {
      const withdrawAmount = withdrawInput.value;

      if (Number(withdrawAmount) <= MIN_INPUT_VALUE) {
        throw new Error(
          `Minium Withdraw: ${MIN_INPUT_VALUE} ${FARMING_LP_SYMBOL[chainId]}`,
        );
      }

      const amount = parseUnits(withdrawAmount);

      const transaction = await staking.withdraw(pool?.address, amount);

      withdrawInput.clear();

      toast.loading(
        <TransactionToast
          message={`Withdraw ${withdrawAmount} ${FARMING_LP_SYMBOL[chainId]}`}
          hash={transaction.hash}
          chainId={chainId}
        />,
        {
          id: _id,
        },
      );

      await transaction.wait();

      toast.success(
        <TransactionToast
          message={`Withdraw ${withdrawAmount} ${FARMING_LP_SYMBOL[chainId]}`}
          hash={transaction.hash}
          chainId={chainId}
        />,
        {
          id: _id,
        },
      );

      poolTokenBalanceMutate();
      poolTokenBalanceLockedMutate();
    } catch (error) {
      handleError(error, _id);
    }
  }

  const withdrawInputIsMax =
    poolTokenBalanceLocked &&
    withdrawInput.value === formatUnits(poolTokenBalanceLocked);
  const setWithdrawMax = () => {
    withdrawInput.setValue(formatUnits(poolTokenBalanceLocked));
  };

  return (
    <form onSubmit={withdrawPoolToken} method="POST">
      <div className="space-y-4">
        <div className="flex justify-between">
          <h2 className="font-medium leading-5">Withdraw {pool?.name}</h2>

          {!!pool && (
            <a
              href={pool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-5 w-5 rounded focus:outline-none focus:ring-4"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>

        <div>
          <div className="flex space-x-4 mb-2">
            <TokenPair
              pairs={pool?.pairs}
              symbol={FARMING_LP_SYMBOL[chainId]}
            />

            <div className="flex-1">
              <label className="sr-only" htmlFor="withdraw">
                {`Enter amount of ${FARMING_LP_SYMBOL[chainId]} to withdraw`}
              </label>

              <NumericalInput
                id="withdraw"
                name="withdraw"
                required
                {...withdrawInput.valueBind}
              />
            </div>
          </div>

          <p className="text-sm text-gray-300 h-5">
            {poolTokenBalanceLocked && fmPoolTokenBalanceLocked ? (
              <>
                <span>{`Available: ${fmPoolTokenBalanceLocked} ${FARMING_LP_SYMBOL[chainId]}`}</span>{' '}
                {!withdrawInputIsMax && <MaxButton onClick={setWithdrawMax} />}
              </>
            ) : null}
          </p>
        </div>

        <div className="space-y-4">
          <Button disabled={!(withdrawInput.hasValue && !!pool)} type="submit">
            {withdrawInput.hasValue && !!pool ? 'Withdraw' : 'Enter an amount'}
          </Button>
        </div>
      </div>
    </form>
  );
}
