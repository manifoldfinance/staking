import type { DOMODAO } from '@/contracts/types';
import { EPOCH_DURATION } from '@/constants/numbers';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDictatorDAO } from './shared/useContract';
import useSWR from 'swr';

dayjs.extend(relativeTime);

function getEpochDates(contract: DOMODAO) {
  return async (_: string) => {
    const epochStart = await contract.GRACE_PERIOD();

    const currentEpoch = await contract.DELAY();

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
  const contract = useDictatorDAO();

  const shouldFetch = !!contract;

  return useSWR(shouldFetch ? ['EpochDates'] : null, getEpochDates(contract));
}
