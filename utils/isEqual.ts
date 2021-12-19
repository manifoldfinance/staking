/**
 * Case-insensitive string comparison
 */
export default function isEqual(a: string, b: string) {
  return a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0;
}
