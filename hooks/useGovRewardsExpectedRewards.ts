import { GovRewards, XFOLDFacet } from '@/contracts/types';
import { btof } from '@/utils/bn';
import useSWR from 'swr';
import { useGovRewards, useXFOLDFacetProxy } from './useContract';

function getGovRewardsExpectedRewards(
  USDFacet: XFOLDFacet,
  govRewards: GovRewards,
) {
  return async (_: string, userAddress: string) => {
    const balanceOf = await USDFacet.balanceOf(userAddress);

    const xfoldStaked = await USDFacet.xfoldStaked();

    const rewardsForEpoch = await govRewards.getRewardsForEpoch();

    const expectedRewards =
      (btof(balanceOf) / btof(xfoldStaked)) * btof(rewardsForEpoch);

    return expectedRewards;
  };
}

export default function useGovRewardsExpectedRewards(userAddress: string) {
  const USDFacet = useXFOLDFacetProxy();

  const govRewards = useGovRewards();

  const shouldFetch =
    !!govRewards && !!USDFacet && typeof userAddress === 'string';

  return useSWR(
    shouldFetch ? ['GovRewardsExpectedRewards', userAddress] : null,
    getGovRewardsExpectedRewards(USDFacet, govRewards),
    {
      shouldRetryOnError: false,
    },
  );
}
