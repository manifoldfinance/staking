import type { XFOLDFacet } from '@/contracts/types';
import useSWR from 'swr';
import { useXFOLDFacetProxy } from '../useContract';
import useWeb3Store from '../useWeb3Store';

function getVotingPower(USDFacet: XFOLDFacet) {
  return async (_: string, userAddress: string) => {
    const timestamp = Date.now();

    const votingPowerAtTs = await USDFacet.votingPowerAtTs(
      userAddress,
      timestamp,
    );

    const votingPower = await USDFacet.votingPower(userAddress);

    const xfoldStaked = await USDFacet.xfoldStaked();

    const xfoldStakedAtTs = await USDFacet.xfoldStakedAtTs(timestamp);

    return {
      votingPowerAtTs,
      votingPower,
      xfoldStaked,
      xfoldStakedAtTs,
    };
  };
}

export default function useVotingPower() {
  const account = useWeb3Store((state) => state.account);

  const USDFacet = useXFOLDFacetProxy();

  const shouldFetch = !!USDFacet && typeof account === 'string';

  return useSWR(
    shouldFetch ? ['VotingPower', account] : null,
    getVotingPower(USDFacet),
  );
}
