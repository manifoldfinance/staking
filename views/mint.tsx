import { tabClassNames, tabPanelClassNames } from '@/components/tabs';

import Deposit from '@/components/mint/deposit';
import Panel from '@/components/panel';
import { Tab } from '@headlessui/react';

//import Withdraw from "@/components/mint/withdraw";

const TAB_KEYS = {
  DEPOSIT: 'Deposit',
  WITHDRAW: 'Withdraw',
};

function InvestView() {
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
          </Tab.List>

          <Tab.Panels className="mt-2">
            <Tab.Panel
              as={Panel}
              key={TAB_KEYS.DEPOSIT}
              className={tabPanelClassNames}
            >
              <Deposit />
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

export default InvestView;
