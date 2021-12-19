import { DAO_THRESHOLD } from '@/constants/numbers';
import useFormattedBigNumber from '@/hooks/useFormattedBigNumber';
import useWeb3Store from '@/hooks/useWeb3Store';
import useVotingPower from '@/hooks/view/useVotingPower';
import { commify, formatUnits } from '@ethersproject/units';
import { useMemo } from 'react';
import Panel from '../panel';

export default function DAOProgress() {
  const chainId = useWeb3Store((state) => state.chainId);

  const { data: votingPower } = useVotingPower();

  const progress = useMemo(() => {
    if (typeof votingPower === 'undefined') {
      return 0;
    }

    const totalStaked = parseFloat(formatUnits(votingPower.xfoldStaked));

    const percentage = (totalStaked / DAO_THRESHOLD[chainId]) * 100;

    if (percentage > 100) {
      return 100;
    }

    return percentage;
  }, [votingPower, chainId]);

  const fmTotal = useFormattedBigNumber(votingPower?.xfoldStaked, 0);

  return (
    <Panel>
      <div className="space-y-4">
        <div>
          <p className="font-medium leading-5 mb-1">MajorDomo Progress</p>

          <p className="text-sm text-gray-300">
            until the Operator is activated
          </p>
        </div>

        <p className="text-4xl leading-none font-semibold h-9">
          {fmTotal}{' '}
          <span className="text-xl leading-none text-gray-500">/</span>{' '}
          <span className="text-xl leading-none">
            {commify(DAO_THRESHOLD[chainId])}
          </span>
        </p>

        <div
          aria-label={`${progress.toFixed(2)}% complete of MajorDomo`}
          aria-valuenow={parseFloat(progress.toFixed(2))}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${progress.toFixed(2)}%`}
          role="progressbar"
          className="w-full"
        >
          <div className="h-3 bg-primary rounded overflow-hidden">
            <div
              className="h-3 bg-indigo-500"
              style={{
                width: `${progress.toFixed(2)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
