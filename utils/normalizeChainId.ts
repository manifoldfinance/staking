export default function normalizeChainId(chainId: string | number): number {
  if (typeof chainId === 'string') {
    const parsedChainId = Number.parseInt(
      chainId,
      chainId.trim().substring(0, 2) === '0x' ? 16 : 10,
    );

    if (Number.isNaN(parsedChainId))
      throw new Error(`chainId ${chainId} is not an integer`);

    return parsedChainId;
  } else {
    if (!Number.isInteger(chainId))
      throw new Error(`chainId ${chainId} is not an integer`);

    return chainId;
  }
}
