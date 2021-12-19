import DepositStake from '@/components/stake/depositStake';
import LockStake from '@/components/stake/lockStake';
import WithdrawStake from '@/components/stake/withdrawStake';
import Panel from '@/components/panel';
import { tabClassNames, tabPanelClassNames } from '@/components/tabs';
import { Tab } from '@headlessui/react';

const TAB_KEYS = {
  DEPOSIT: 'Deposit',
  WITHDRAW: 'Withdraw',
  LOCK: 'Lock',
};

function StakeView() {
  return (
    <section className="sm:pt-8 md:pt-16 pb-8 text-white">
      <div className="px-5 max-w-lg mx-auto">
        <Tab.Group>
          <Tab.List as={Panel} className="flex space-x-1" padding="p-1">
            <Tab key={TAB_KEYS.DEPOSIT} className={tabClassNames}>
              {TAB_KEYS.DEPOSIT}
            </Tab>

            <Tab key={TAB_KEYS.WITHDRAW} className={tabClassNames}>
              {TAB_KEYS.WITHDRAW}
            </Tab>

            <Tab key={TAB_KEYS.LOCK} className={tabClassNames}>
              {TAB_KEYS.LOCK}
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
              key={TAB_KEYS.LOCK}
              className={tabPanelClassNames}
            >
              <LockStake />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
}

export default StakeView;
