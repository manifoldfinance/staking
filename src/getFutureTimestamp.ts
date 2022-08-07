import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default function getFutureTimestamp(days: number) {
  return dayjs().utc(true).add(days, 'days').unix();
}
