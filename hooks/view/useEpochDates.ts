import { EPOCH_DURATION } from '@/constants/numbers';
import type { GovRewards } from '@/contracts/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useSWR from 'swr';
import { useGovRewards } from '../useContract';

dayjs.extend(relativeTime);

function getEpochDates(contract: GovRewards) {
  return async (_: string) => {
    const epochStart = await contract.epochStart();

    const currentEpoch = await contract.getCurrentEpoch();

    const startDate =
      epochStart.toNumber() + (currentEpoch.toNumber() - 1) * EPOCH_DURATION;

    const endDate =
      epochStart.toNumber() + currentEpoch.toNumber() * EPOCH_DURATION;

    const progress =
      ((Date.now() - startDate * 1_000) / (EPOCH_DURATION * 1_000)) * 100;

    return {
      startDate,
      endDate,
      progress,
      relative: dayjs.unix(endDate).fromNow(true),
    };
  };
}

export default function useEpochDates() {
  const contract = useGovRewards();

  const shouldFetch = !!contract;

  return useSWR(shouldFetch ? ['EpochDates'] : null, getEpochDates(contract));
}
