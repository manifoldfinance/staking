import useFormattedBigNumber from '@/hooks/useFormattedBigNumber';
import useVotingPower from '@/hooks/view/useVotingPower';
import Link from 'next/link';
import { Plus } from 'react-feather';
import Panel from '../panel';

export default function VotingPower() {
  const { data: votingPower } = useVotingPower();

  const fmVotingPower = useFormattedBigNumber(votingPower?.votingPower, 0);

  const fmVotingPowerAtTs = useFormattedBigNumber(
    votingPower?.votingPowerAtTs,
    0,
  );

  const fmXFOLDStakedAtTs = useFormattedBigNumber(
    votingPower?.xfoldStakedAtTs,
    0,
  );

  const fmXFOLDStaked = useFormattedBigNumber(votingPower?.xfoldStaked, 0);

  return (
    <>
      <Panel className="flex-1">
        <div className="flex justify-between mb-4">
          <h2 className="font-medium leading-5">Next epoch’s voting power</h2>

          <Link href="/stake">
            <a>
              <Plus size={20} />
            </a>
          </Link>
        </div>

        <p className="text-2xl leading-none font-semibold">
          {fmVotingPower} <span className="text-gray-500">/</span>
          <br />
          <span className="text-lg leading-none">{`${fmXFOLDStaked} votes`}</span>
        </p>
      </Panel>

      <Panel className="flex-1">
        <div className="flex justify-between mb-4">
          <h2 className="font-medium leading-5">This epoch’s voting power</h2>
        </div>

        <p className="text-2xl leading-none font-semibold">
          {fmVotingPowerAtTs} <span className="text-gray-500">/</span>
          <br />
          <span className="text-lg leading-none">{`${fmXFOLDStakedAtTs} votes`}</span>
        </p>
      </Panel>
    </>
  );
}
