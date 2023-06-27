import { tabClassNames, tabPanelClassNames } from '@/components/tabs';

import DepositStake from '@/components/stake/depositStake';
import MintDeposit from '@/components/mint/deposit';
import Panel from '@/components/panel';
import { Tab } from '@headlessui/react';
import WithdrawStake from '@/components/stake/withdrawStake';

const TAB_KEYS = {
  DEPOSIT: 'Deposit',
  WITHDRAW: 'Withdraw',
  MINT: 'Staking',
};

function StakeView() {
  return (
    <>
    <section className="pb-8 text-white sm:pt-8 md:pt-16">
      <div className="px-5 mx-auto max-w-lg">
        <Tab.Group defaultIndex={0}>
          <Tab.List as={Panel} className="flex space-x-1" padding="p-1">
            <Tab disabled key={TAB_KEYS.DEPOSIT} className="w-full py-2.5 text-sm leading-5 font-medium rounded-lg cursor-not-allowed text-gray-400 text-opacity-75">
              {TAB_KEYS.DEPOSIT}
            </Tab>

            <Tab key={TAB_KEYS.WITHDRAW} className={tabClassNames}>
              {TAB_KEYS.WITHDRAW}
            </Tab>

            <Tab disabled key={TAB_KEYS.MINT} className="w-full py-2.5 text-sm leading-5 font-medium rounded-lg cursor-not-allowed text-gray-400 text-opacity-75">
              {TAB_KEYS.MINT}
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-2">
            <Tab.Panel
              as={Panel}
              key={TAB_KEYS.DEPOSIT}
              className={tabPanelClassNames}
            >
              <DepositStake />
            </Tab.Panel>

            <Tab.Panel
              as={Panel}
              key={TAB_KEYS.WITHDRAW}
              className={tabPanelClassNames}
            >
              <WithdrawStake />
            </Tab.Panel>

            <Tab.Panel
              as={Panel}
              key={TAB_KEYS.MINT}
              className={tabPanelClassNames}
            >
              <MintDeposit />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
    <section className='pb-8 text-white px-6 sm:pt-8 md:pt-16'>
      <div className="bg-primary-400 py-4 mx-auto max-w-lg ring-1 ring-white ring-opacity-20 rounded-lg text-center">
        FOLD/XFOLD Staking is deprecated!
        <p> Dapp has been switched to <strong> withdrawal-only </strong> mode </p>
        <p> Stay tuned for V2 </p>
      </div>
      </section>
      </>
  );
}

export default StakeView;
