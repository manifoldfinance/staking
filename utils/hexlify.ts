export default function hexlify(message: string) {
  return '0x' + Buffer.from(message, 'utf8').toString('hex');
}
