import { TokenNames } from '@/constants/tokens';
import { Listbox } from '@headlessui/react';
import classNames from 'classnames';
import type { Dispatch, SetStateAction } from 'react';
import { ChevronDown } from 'react-feather';

export type Token = {
  symbol: keyof typeof TokenNames;
  address: string;
  out?: bigint;
};

type TokenSelectProps = {
  value: Token;
  onChange: Dispatch<
    SetStateAction<{
      symbol: string;
      address: string;
    }>
  >;
  tokens: Token[];
  order: 'ASC' | 'DESC';
};

export default function TokenSelect({
  value,
  onChange,
  tokens,
  order,
}: TokenSelectProps) {
  const sortTokens = (a: Token, b: Token) => {
    if (order === 'ASC') {
      return a.out < b.out ? -1 : a.out > b.out ? 1 : 0;
    } else {
      return a.out > b.out ? -1 : a.out < b.out ? 1 : 0;
    }
  };

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className={classNames(
            'relative py-2 pr-10 text-left rounded-xl cursor-default focus:outline-none focus-visible:ring-4 text-lg leading-6 flex items-center space-x-2',
            value ? 'bg-primary pl-2' : 'bg-white text-primary pl-4',
          )}
        >
          {value && (
            <img
              alt={value?.symbol}
              className="rounded-full bg-primary"
              decoding="async"
              height={24}
              loading="lazy"
              src={`https://raw.githubusercontent.com/manifoldfinance/website/master/public/token.png`}
              width={24}
            />
          )}

          <span className="block truncate font-medium">
            {value ? value.symbol : 'Select a token'}
          </span>

          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown size={20} aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute max-h-60 w-48 mt-2 overflow-auto bg-primary-300 ring-1 ring-inset ring-white ring-opacity-20 rounded-lg focus:outline-none p-1">
          {tokens?.sort(sortTokens)?.map((token, tokenIndex) => (
            <Listbox.Option
              key={tokenIndex}
              className={({ active }) =>
                classNames(
                  'cursor-default select-none p-2 rounded text-white',
                  active ? 'bg-white/[0.10]' : '',
                )
              }
              value={token}
              disabled={token === value}
            >
              {({ selected }) => (
                <div
                  className={classNames(
                    'flex justify-between',
                    selected ? 'opacity-50' : '',
                  )}
                >
                  <div className="flex-shrink-0 flex items-center space-x-2">
                    <img
                      alt={token.symbol}
                      className="rounded-full bg-primary h-5 w-5"
                      decoding="async"
                      height={20}
                      loading="lazy"
                      src={`https://raw.githubusercontent.com/manifoldfinance/website/master/public/token.png`}
                      width={20}
                    />

                    <span
                      className={classNames(
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate leading-5',
                      )}
                    >
                      {token.symbol}
                    </span>
                  </div>

                  {tokenIndex === 0 && typeof token.out === 'bigint' && (
                    <div className="py-1 px-1.5 rounded-md bg-indigo-500 text-white whitespace-nowrap text-xs leading-none font-medium">
                      <span>Best Returns</span>
                    </div>
                  )}
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export function TokenSingle({ symbol }: { symbol: string }) {
  return (
    <div className="relative inline-flex py-2 pl-2 pr-3 text-left rounded-xl cursor-default focus:outline-none focus-visible:ring-4 text-lg leading-6 items-center space-x-2 bg-primary">
      <img
        alt={symbol}
        className="rounded-full h-6 w-6"
        height={24}
        src={`/tokens/${symbol}.png`}
        width={24}
      />

      <span className="block truncate font-medium">{symbol}</span>
    </div>
  );
}

export function TokenPair({
  pairs,
  symbol,
}: {
  pairs: string[];
  symbol: string;
}) {
  return (
    <div className="relative inline-flex py-2 pl-2 pr-3 text-left rounded-xl cursor-default focus:outline-none focus-visible:ring-4 text-lg leading-6 items-center space-x-2 bg-primary">
      <div className="flex -space-x-2">
        {!!pairs ? (
          pairs?.map((pair, pairIndex) => (
            <div className="relative" key={pairIndex}>
              <div className="absolute ring-1 ring-inset ring-white ring-opacity-20 rounded-full w-6 h-6" />

              <img
                width={24}
                height={24}
                className="rounded-full w-6 h-6"
                src={`https://raw.githubusercontent.com/manifoldfinance/website/master/public/token.png`}
                alt={pair}
              />
            </div>
          ))
        ) : (
          <>
            <div className="ring-1 ring-inset ring-white ring-opacity-20 rounded-full w-6 h-6 bg-primary-400" />
            <div className="ring-1 ring-inset ring-white ring-opacity-20 rounded-full w-6 h-6 bg-primary-400" />
          </>
        )}
      </div>

      <span className="block truncate font-medium">{symbol}</span>
    </div>
  );
}
