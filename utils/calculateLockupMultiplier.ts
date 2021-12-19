export default function calculateLockupMultiplier(days: string | number) {
  return Number((Number(days) / (365 * 2)) * 0.5 + 1).toFixed(2);
}
