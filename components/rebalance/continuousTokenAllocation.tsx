import { TOKEN_COLORS } from '@/constants/tokens';
import useContinuousTokenAllocation from '@/hooks/view/useContinuousTokenAllocation';
import useEpochDates from '@/hooks/view/useEpochDates';
import classNames from 'classnames';
import { ArrowDown, ArrowUp } from 'react-feather';

export default function ContinuousTokenAllocation() {
  const { data: epochDates } = useEpochDates();

  const { data: continuousTokenAllocation } = useContinuousTokenAllocation();

  const totalAllocation =
    continuousTokenAllocation &&
    continuousTokenAllocation
      .map((token) => token.allocation)
      .reduce((prev, cur) => cur + prev);

  return (
    <div className="space-y-4">
      <div>
        <p className="font-medium leading-5 mb-1">Epoch Allocation Vote</p>

        <p className="text-sm text-gray-300">
          {`Allocation Change is applied at the end of the epoch in ${
            epochDates ? epochDates.relative : '...'
          }`}
        </p>
      </div>

      <div className="h-12 rounded w-full bg-primary flex relative overflow-hidden">
        {continuousTokenAllocation?.map((token, tokenIndex) => (
          <div
            key={token.address}
            className={classNames(
              'h-12 flex items-center justify-between px-4 text-sm',
              TOKEN_COLORS[tokenIndex],
            )}
            style={{
              width: `${(token.allocation / totalAllocation) * 100}%`,
            }}
          >
            <span className="font-bold">{token.symbol}</span>

            <div className="flex space-x-0.5 items-center">
              {token.percentChange === 0 ? (
                <>
                  <span className="font-medium">{`0.00%`}</span>
                </>
              ) : token.percentChange > 0 ? (
                <>
                  <ArrowUp size={18} />

                  <span className="font-medium">{`${token.percentChange.toFixed(
                    2,
                  )}%`}</span>
                </>
              ) : (
                <>
                  <ArrowDown size={18} />

                  <span className="font-medium">{`${(
                    token.percentChange * -1
                  ).toFixed(2)}%`}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
