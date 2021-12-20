import { tabClassNames, tabPanelClassNames } from '@/components/tabs';

import MintDeposit from '@/components/mint/deposit';
import Panel from '@/components/panel';
import { Tab } from '@headlessui/react';
import WithdrawStake from '@/components/stake/withdrawStake';

const TAB_KEYS = {
  DEPOSIT: 'Deposit',
  WITHDRAW: 'Withdraw',
  MINTDEPOSIT: 'Staking',
};

function MintView() {
  return (
    <section className="pb-8 text-white sm:pt-8 md:pt-16">
      <div className="px-5 mx-auto max-w-lg">
        <Tab.Group>
          <Tab.List as={Panel} className="flex space-x-1" padding="p-1">
            <Tab key={TAB_KEYS.MINTDEPOSIT} className={tabClassNames}>
              {TAB_KEYS.MINTDEPOSIT}
            </Tab>
            <WithdrawStake />
            <Tab key={TAB_KEYS.WITHDRAW} className={tabClassNames}>
              {TAB_KEYS.WITHDRAW}
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-2">
            <Tab.Panel
              as={Panel}
              key={TAB_KEYS.MINTDEPOSIT}
              className={tabPanelClassNames}
            >
              <MintDeposit />
            </Tab.Panel>

            <Tab.Panel
              as={Panel}
              key={TAB_KEYS.WITHDRAW}
              className={tabPanelClassNames}
            ></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
}

export default MintView;
