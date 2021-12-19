import { tabClassNames, tabPanelClassNames } from '@/components/tabs';

import MintDeposit from '@/components/mint/deposit';
import Panel from '@/components/panel';
import { Tab } from '@headlessui/react';

//import Withdraw from "@/components/mint/withdraw";

const TAB_KEYS = {
  MINTDEPOSIT: 'Deposit',
  WITHDRAW: 'Withdraw',
};

function MintView() {
  return (
    <section className="sm:pt-8 md:pt-16 pb-8 text-white">
      <div className="px-5 max-w-lg mx-auto">
        <Tab.Group>
          <Tab.List as={Panel} className="flex space-x-1" padding="p-1">
            <Tab key={TAB_KEYS.MINTDEPOSIT} className={tabClassNames}>
              {TAB_KEYS.MINTDEPOSIT}
            </Tab>

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
