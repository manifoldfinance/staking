import LPRewards_ABI from '@/contracts/LPRewards.json';
import type { LPRewards } from '@/contracts/types';
import { BigNumber } from '@ethersproject/bignumber';
import useSWR from 'swr';
import useContract from '../useContract';

function getHarvestableUserRewards(contract: LPRewards) {
  return async () => {
    const lastEpochIdHarvested = await contract.userLastEpochIdHarvested();

    const currentEpoch = await contract.getCurrentEpoch();

    let total = BigNumber.from(0);

    if (lastEpochIdHarvested.toNumber() === currentEpoch.toNumber() - 1) {
      return total;
    }

    async function* epochToHarvestGenerator() {
      let i = lastEpochIdHarvested.toNumber();
      while (i < currentEpoch.toNumber()) {
        yield i++;
      }
    }

    for await (let epochId of epochToHarvestGenerator()) {
      const rewards = await contract.getUserRewardsForEpoch(epochId);

      total = total.add(rewards);
    }

    return total;
  };
}

export default function useHarvestableUserRewards(
  userAddress: string,
  contractAddress: string,
) {
  const contract = useContract<LPRewards>(contractAddress, LPRewards_ABI);

  const shouldFetch = !!contract && typeof userAddress === 'string';

  return useSWR(
    shouldFetch
      ? ['HarvestableUserRewards', userAddress, contractAddress]
      : null,
    getHarvestableUserRewards(contract),
    {
      shouldRetryOnError: false,
    },
  );
}
