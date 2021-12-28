import { useFoldToken, useDictatorDAO } from '@/hooks/useContract';
import useWeb3Store from '@/hooks/useWeb3Store';
import useHasVotedInEpoch from '@/hooks/view/useHasVotedInEpoch';
//import useIsOperatorInitialized from '@/hooks/view/useIsOperatorInitialized';
import useMaxDelta from '@/hooks/view/useMaxDelta';
import { useXFOLDStaked } from '@/hooks/view/usexFOLDStaked';
import useTokenAllocation from '@/hooks/view/useTokenAllocation';
import handleError from '@/utils/handleError';
import { parseUnits } from '@ethersproject/units';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Minus, Plus } from 'react-feather';
import toast from 'react-hot-toast';
import Button from '../button';
import { TransactionToast } from '../customToast';

export default function AllocationAdjustment() {
  const chainId = useWeb3Store((state) => state.chainId);

  const basketBalancer = useFoldToken();

  const DictatorDAO = useDictatorDAO();

  const { data: xfoldStaked } = useXFOLDStaked();

  const { data: setOperator, mutate: hasVotedInEpochMutate } =
    useHasVotedInEpoch();

  const { data: delta } = useMaxDelta();

  const { data: tokenAllocation } = useTokenAllocation();

  const { mutate: continuousTokenAllocationMutate } =
    useContinuousTokenAllocation();

  const totalAllocation =
    tokenAllocation &&
    tokenAllocation
      .map((token) => token.allocation)
      .reduce((prev, cur) => cur + prev);

  const [inputObject, inputObjectSet] = useState<Record<string, number>>();

  const total =
    inputObject && Object.values(inputObject).reduce((prev, cur) => prev + cur);

  useEffect(() => {
    if (typeof tokenAllocation === 'undefined') {
      return;
    }

    inputObjectSet(
      Object.fromEntries(
        tokenAllocation.map((el) => [el.address, el.allocation]),
      ),
    );
  }, [tokenAllocation]);

  const { data: isOperatorInitialized, mutate: isOperatorInitializedMutate } =
    useIsOperatorInitialized();

  const canUpdate =
    isOperatorInitialized && !xfoldStaked?.isZero() && !setOperator;

  async function updateAllocationVote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const _id = toast.loading('Waiting for confirmation');

    try {
      const transaction = await basketBalancer.updateAllocationVote(
        Object.keys(inputObject),
        Object.values(inputObject).map((el) => parseUnits(el.toString())),
      );

      toast.loading(
        <TransactionToast
          hash={transaction.hash}
          chainId={chainId}
          message={`Update Token Allocation Vote`}
        />,
        { id: _id },
      );

      await transaction.wait();

      toast.success(
        <TransactionToast
          hash={transaction.hash}
          chainId={chainId}
          message={`Update Token Allocation Vote`}
        />,
        { id: _id },
      );

      hasVotedInEpochMutate();
      continuousTokenAllocationMutate();
    } catch (error) {
      handleError(error, _id);
    }
  }

  async function enableVoting() {
    const _id = toast.loading('Waiting to set operator');

    try {
      const transaction = await DictatorDAO.setOperator();

      toast.loading(
        <TransactionToast
          hash={transaction.hash}
          chainId={chainId}
          message={`Initialize Current Epoch`}
        />,
        { id: _id },
      );

      await transaction.wait();

      toast.success(
        <TransactionToast
          hash={transaction.hash}
          chainId={chainId}
          message={`Initialize Current Epoch`}
        />,
        { id: _id },
      );

      isOperatorInitializedMutate();
    } catch (error) {
      handleError(error, _id);
    }
  }

  return (
    <form method="POST" onSubmit={updateAllocationVote} className="flex-1">
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-medium leading-5">Adjust Token Allocation</h2>

        <p className="leading-none text-right">
          <span className="font-semibold">Total Allocation:</span>{' '}
          <span>
            {totalAllocation ? `${total} / ${totalAllocation}` : '...'}
          </span>
        </p>
      </div>

      <div className="mb-4">
        <ul className="grid md:grid-cols-2 gap-4">
          {inputObject &&
            tokenAllocation &&
            tokenAllocation?.map((token) => {
              return (
                <li key={token.address}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <img
                          alt={token.symbol}
                          className="rounded-full bg-primary"
                          decoding="async"
                          height={20}
                          loading="lazy"
                          src={`https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/${token.symbol}.svg`}
                          width={20}
                        />

                        <p className="text-xl font-semibold leading-none">
                          {token.symbol}
                        </p>
                      </div>

                      <p className="text-sm text-gray-300">{`Current Allocation: ${token.allocation}`}</p>
                    </div>

                    <div className="flex divide-x">
                      <button
                        type="button"
                        className="flex-1 p-2 border-primary-300 rounded-l-md whitespace-nowrap bg-primary flex focus:outline-none focus:ring-4"
                        onClick={() =>
                          inputObjectSet((prev) => {
                            const prevValue = prev[token.address];

                            if (prevValue >= token.allocation + delta) {
                              return prev;
                            }

                            return {
                              ...prev,
                              [token.address]: prevValue + 0.5,
                            };
                          })
                        }
                      >
                        <Plus size={20} />
                      </button>

                      <div className="p-2 w-16 border-primary-300 whitespace-nowrap bg-primary flex items-center justify-center leading-5 focus-within:ring-4">
                        <input
                          autoComplete="off"
                          autoCorrect="off"
                          inputMode="decimal"
                          max={token.allocation + delta}
                          min={token.allocation - delta}
                          required
                          step={0.01}
                          value={inputObject[token.address]}
                          onChange={(event) =>
                            inputObjectSet((prev) => ({
                              ...prev,
                              [token.address]: event.target.valueAsNumber,
                            }))
                          }
                          className="hide-number-input-arrows w-full text-center appearance-none bg-transparent focus:outline-none mr-0.5 text-white"
                          spellCheck="false"
                          type="number"
                        />
                      </div>

                      <button
                        type="button"
                        className="flex-1 p-2 border-primary-300 rounded-r-md whitespace-nowrap bg-primary flex focus:outline-none focus:ring-4"
                        onClick={() =>
                          inputObjectSet((prev) => {
                            const prevValue = prev[token.address];

                            if (prevValue <= token.allocation - delta) {
                              return prev;
                            }

                            return {
                              ...prev,
                              [token.address]: prevValue - 0.5,
                            };
                          })
                        }
                      >
                        <Minus size={20} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="space-y-2">
        {!isOperatorInitialized && (
          <Button small onClick={enableVoting}>
            {`Enable voting for this epoch`}
          </Button>
        )}

        <Button small type="submit" disabled={!canUpdate}>
          {canUpdate
            ? total === totalAllocation
              ? `Cast vote`
              : `Total allocation must be ${totalAllocation}`
            : `Cast vote`}
        </Button>
      </div>
    </form>
  );
}
