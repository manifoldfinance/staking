import { tabClassNames, tabPanelClassNames } from '@/components/tabs';

//import DepositStake from '@/components/stake/depositStake';
//import MintDeposit from '@/components/mint/deposit';
import Panel from '@/components/panel';
import { Tab } from '@headlessui/react';
import WithdrawStake from '@/components/stake/withdrawStake';

const TAB_KEYS = {
  WITHDRAW: 'Withdraw',
};

function StakeView() {
  return (
    <section className="pb-8 text-white sm:pt-8 md:pt-16">
      <div className="px-5 mx-auto max-w-lg">
        <Tab.Group>
          <Tab.List as={Panel} className="flex space-x-1" padding="p-1">
            <Tab key={TAB_KEYS.WITHDRAW} className={tabClassNames}>
              {TAB_KEYS.WITHDRAW}
            </Tab>
          </Tab.List>

          <Tab.Panel
            as={Panel}
            key={TAB_KEYS.WITHDRAW}
            className={tabPanelClassNames}
          >
            <WithdrawStake />
          </Tab.Panel>
        </Tab.Group>
      </div>
    </section>
  );
}

export default StakeView;
