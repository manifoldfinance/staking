import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

const NO_VERSION = -1;
const CURRENT_VERSION = 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeTokens(
  tokens: Token[],
): {
  chainId: number;
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
}[] {
  return tokens.map((token) => ({
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deserializeTokens(
  serializedTokens: ReturnType<typeof serializeTokens>,
): Token[] {
  return serializedTokens.map(
    (serializedToken) =>
      new Token(
        serializedToken.chainId,
        serializedToken.address,
        serializedToken.decimals,
        serializedToken.symbol,
        serializedToken.name,
      ),
  );
}

interface Transaction {
  chainId: number;
  hash: string;
}
