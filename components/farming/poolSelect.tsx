import { FarmingPool, LP_FARMING_POOLS } from '@/constants/farming';
import useWeb3Store from '@/hooks/useWeb3Store';
import { Listbox } from '@headlessui/react';
import classNames from 'classnames';
import type { Dispatch, SetStateAction } from 'react';
import { ChevronDown } from 'react-feather';

type PoolSelectProps = {
  value: FarmingPool;
  onChange: Dispatch<SetStateAction<FarmingPool>>;
};

export default function PoolSelect({ value, onChange }: PoolSelectProps) {
  const chainId = useWeb3Store((state) => state.chainId);

  return (
    <Listbox disabled={!chainId} value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className={classNames(
            'relative py-2 pr-10 text-left rounded-lg cursor-default focus:outline-none focus-visible:ring-4 text-lg leading-6 flex w-full items-center space-x-2',
            value ? 'bg-primary pl-2' : 'bg-white text-primary pl-4',
          )}
        >
          <span className="block truncate font-medium">
            {value ? value.name : 'Select a pool'}
          </span>

          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown size={20} aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute w-full max-h-60 mt-2 overflow-auto bg-primary-300 ring-1 ring-inset ring-white ring-opacity-20 rounded-lg focus:outline-none p-1">
          {(LP_FARMING_POOLS[chainId] as FarmingPool[]).map(
            (farmingPool, farmingPoolIndex) => (
              <Listbox.Option
                key={farmingPoolIndex}
                className={({ active }) =>
                  classNames(
                    'cursor-default select-none relative p-2 rounded text-white',
                    active ? 'bg-white/[0.10]' : '',
                  )
                }
                value={farmingPool}
                disabled={farmingPool === value}
              >
                {({ selected }) => (
                  <div
                    className={classNames(
                      'flex justify-between',
                      selected ? 'opacity-50' : '',
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={classNames(
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate leading-5',
                        )}
                      >
                        {farmingPool.name}
                      </span>
                    </div>
                  </div>
                )}
              </Listbox.Option>
            ),
          )}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
