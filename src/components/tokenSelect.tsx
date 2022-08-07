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
            'flex relative items-center py-2 pr-10 space-x-2 text-lg leading-6 text-left rounded-xl cursor-default focus:outline-none focus-visible:ring-4',
            value ? 'pl-2 bg-primary' : 'pl-4 bg-white text-primary',
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

          <span className="block font-medium truncate">
            {value ? value.symbol : 'Protocol Activity'}
          </span>

          <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
            <ChevronDown size={20} aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="overflow-auto absolute p-1 mt-2 w-48 max-h-60 rounded-lg ring-1 ring-inset ring-white ring-opacity-20 bg-primary-300 focus:outline-none">
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
                  <div className="flex flex-shrink-0 items-center space-x-2">
                    <img
                      alt={token.symbol}
                      className="w-5 h-5 rounded-full bg-primary"
                      decoding="async"
                      height={20}
                      loading="lazy"
                      src={`https://raw.githubusercontent.com/manifoldfinance/website/master/public/token.png`}
                      width={20}
                    />

                    <span
                      className={classNames(
                        selected ? 'font-medium' : 'font-normal',
                        'block leading-5 truncate',
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
    <div className="inline-flex relative items-center py-2 pr-3 pl-2 space-x-2 text-lg leading-6 text-left rounded-xl cursor-default focus:outline-none focus-visible:ring-4 bg-primary">
      <img
        alt={symbol}
        className="w-6 h-6 rounded-full"
        height={24}
        src={`https://raw.githubusercontent.com/manifoldfinance/website/master/public/XFOLD.png`}
        width={24}
      />

      <span className="block font-medium truncate">{symbol}</span>
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
    <div className="inline-flex relative items-center py-2 pr-3 pl-2 space-x-2 text-lg leading-6 text-left rounded-xl cursor-default focus:outline-none focus-visible:ring-4 bg-primary">
      <div className="flex -space-x-2">
        {!!pairs ? (
          pairs?.map((pair, pairIndex) => (
            <div className="relative" key={pairIndex}>
              <div className="absolute w-6 h-6 rounded-full ring-1 ring-inset ring-white ring-opacity-20" />

              <img
                width={24}
                height={24}
                className="w-6 h-6 rounded-full"
                src={`https://raw.githubusercontent.com/manifoldfinance/website/master/public/token.png`}
                alt={pair}
              />
            </div>
          ))
        ) : (
          <>
            <div className="w-6 h-6 rounded-full ring-1 ring-inset ring-white ring-opacity-20 bg-primary-400" />
            <div className="w-6 h-6 rounded-full ring-1 ring-inset ring-white ring-opacity-20 bg-primary-400" />
          </>
        )}
      </div>

      <span className="block font-medium truncate">{symbol}</span>
    </div>
  );
}
