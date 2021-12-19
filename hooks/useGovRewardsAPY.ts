import type { GovRewards } from '@/contracts/types';
import type { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import useSWR from 'swr';
import { useGovRewards } from './useContract';

function getGovRewardsAPY(contract: GovRewards) {
  return async () => {
    const totalStake: BigNumber = await contract.getPoolSizeAtTs(Date.now());

    const rewardsForEpoch: BigNumber = await contract.getRewardsForEpoch();

    const totalRewards = rewardsForEpoch.mul(52);

    const apy =
      (parseFloat(formatUnits(totalRewards)) /
        parseFloat(formatUnits(totalStake))) *
      100;

    return apy;
  };
}

export default function useGovRewardsAPY() {
  const contract = useGovRewards();

  const shouldFetch = !!contract;

  return useSWR(
    shouldFetch ? ['GovRewardsAPY'] : null,
    getGovRewardsAPY(contract),
  );
}
