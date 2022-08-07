import * as Slider from '@radix-ui/react-slider';

import { FormEvent, useMemo } from 'react';
import { useFoldToken, useTokenContract } from '@/hooks/useContract';

import { BigNumber } from '@ethersproject/bignumber';
import Button from './shared/button';
import { TransactionToast } from './shared/customToast';
import calculateLockupMultiplier from '@/utils/calculateLockupMultiplier';
import dayjs from 'dayjs';
import getFutureTimestamp from '@/utils/getFutureTimestamp';
import handleError from '@/utils/handleError';
import toast from 'react-hot-toast';
import { useDictatorDAO } from '@/hooks/useContract';
import useInput from '@/hooks/useInput';
import useUserLockedUntil from '@/hooks/view/useUserLockedUntil';
import useWeb3Store from '@/hooks/useWeb3Store';
import { usexFOLDStaked } from '@/hooks/view/usexFOLDStaked';

export default function LockStake() {
  const chainId = useWeb3Store((state) => state.chainId);

  const lockupPeriod = useInput();

  const FOLD_ERC20 = useFoldToken();

  const { data: userLockedUntil, mutate: userLockedUntilMutate } =
    useUserLockedUntil();

  const { data: xfoldStaked } = usexFOLDStaked();

  const isLockupPeriodAfterCurrentLockedTimestamp = useMemo(() => {
    if (typeof userLockedUntil === 'undefined') {
      return;
    }

    const newLockupPeriod = dayjs().add(Number(lockupPeriod.value) - 1, 'days');

    return newLockupPeriod.isAfter(dayjs.unix(userLockedUntil.timestamp));
  }, [userLockedUntil, lockupPeriod.value]);

  async function lockXFOLD(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const _id = toast.loading('Waiting for confirmation');

    try {
      if (xfoldStaked.isZero()) {
        throw new Error('No Balance To Lock');
      }

      const days = Number(lockupPeriod.value);

      if (days > 365 * 2) {
        throw new Error('Max Lockup Time Is 2 Years (730 Days)');
      }

      /**
       * Account for today if the days is equal to 2 years exact, so remove a day
       */
      const futureTimestamp = getFutureTimestamp(
        days === 365 * 2 ? days - 1 : days,
      );

      const transaction = await FOLD_ERC20.lock(
        BigNumber.from(futureTimestamp),
      );

      lockupPeriod.clear();

      toast.loading(
        <TransactionToast
          message={`Lock Stake For ${days} Days`}
          chainId={chainId}
          hash={transaction.hash}
        />,
        { id: _id },
      );

      await transaction.wait();

      toast.success(
        <TransactionToast
          message={`Lock Stake For ${days} Days`}
          chainId={chainId}
          hash={transaction.hash}
        />,
        { id: _id },
      );

      userLockedUntilMutate();
    } catch (error) {
      handleError(error, _id);
    }
  }

  const lockupPeriodMultiplier = useMemo(
    () => calculateLockupMultiplier(lockupPeriod.value),
    [lockupPeriod.value],
  );

  return (
    <form onSubmit={lockXFOLD}>
      <div className="space-y-4">
        <div>
          <h2 className="font-medium leading-5">Lock Stake</h2>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex mb-2 space-x-2">
              <div className="flex flex-1 divide-x">
                <button
                  onClick={() => lockupPeriod.setValue('180')}
                  type="button"
                  className="block flex-1 px-3 py-2 text-center whitespace-nowrap rounded-l-md border-primary-300 bg-primary focus:outline-none focus:ring-4"
                >
                  180 Days
                </button>

                <button
                  onClick={() => lockupPeriod.setValue('365')}
                  type="button"
                  className="block flex-1 px-3 py-2 text-center whitespace-nowrap border-primary-300 bg-primary focus:outline-none focus:ring-4"
                >
                  365 Days
                </button>

                <button
                  onClick={() => lockupPeriod.setValue('730')}
                  type="button"
                  className="block flex-1 px-3 py-2 text-center whitespace-nowrap rounded-r-md border-primary-300 bg-primary focus:outline-none focus:ring-4"
                >
                  730 Days
                </button>
              </div>

              <div className="block py-2 pr-4 pl-3 text-center whitespace-nowrap rounded-md bg-primary focus-within:ring-4">
                <input
                  autoComplete="off"
                  autoCorrect="off"
                  className="flex-1 mr-1 text-right text-white bg-transparent appearance-none hide-number-input-arrows focus:outline-none"
                  id="lockupPeriod"
                  max={365 * 2}
                  min={1}
                  name="lockupPeriod"
                  placeholder="1"
                  step={1}
                  type="number"
                  value={lockupPeriod.value}
                  onChange={(event) =>
                    lockupPeriod.setValue(
                      event.target.valueAsNumber >= 356 * 2
                        ? String(365 * 2)
                        : event.target.value,
                    )
                  }
                />
                <span>Days</span>
              </div>
            </div>

            <Slider.Root
              name="lockupPeriod-range"
              className="flex relative items-center w-full h-5 select-none touch-action-none"
              max={365 * 2}
              min={1}
              step={1}
              value={[Number(lockupPeriod.value)]}
              onValueChange={(value: number[]) =>
                lockupPeriod.setValue(String(value[0]))
              }
            >
              <Slider.Track className="bg-primary-300 relative flex-grow rounded-full h-[3px]">
                <Slider.Range className="absolute h-full bg-white rounded-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-white rounded-full focus:outline-none focus:ring-4" />
            </Slider.Root>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end">
            <p className="leading-none">Rewards Multiplier</p>

            <p className="text-2xl font-semibold leading-none">{`${lockupPeriodMultiplier}x`}</p>
          </div>
        </div>

        {userLockedUntil && userLockedUntil.isLocked && (
          <>
            <div className="w-full h-px bg-primary-300" />

            <div className="flex justify-between">
              <p className="leading-none">Currently Locked Until</p>

              <p className="leading-none">
                <span>{userLockedUntil.formatted}</span>{' '}
                <span>({`${userLockedUntil.multiplier}x`})</span>
              </p>
            </div>
          </>
        )}

        <div className="space-y-4">
          <Button
            type="submit"
            disabled={
              !lockupPeriod.hasValue ||
              !isLockupPeriodAfterCurrentLockedTimestamp
            }
          >
            {lockupPeriod.hasValue ? 'Lock up stake' : 'Select number of days'}
          </Button>
        </div>
      </div>
    </form>
  );
}
