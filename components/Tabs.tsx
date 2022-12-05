import { Tab } from "@headlessui/react";
import Mint from "./Mint";
import Burn from "./Burn";
export default function Tabs() {
  return (
    <section className="py-[130px] px-2 mx-auto max-w-[485px]">
      <div className="flex flex-col gap-2 p-2 md:p-4 rounded-[28px] bg-dark-800 shadow-md relative w-full max-w-xl bg-grayish ">
        <Tab.Group>
          <Tab.List className="p-1 grid grid-cols-2 gap-4 items-center pb-2 text-white ">
            <Tab className=" text-slate-300 text-lg font-light cursor-pointer hover:bg-fresh focus:outline-none aria-selected:bg-fresh rounded-[14px] border border-fresh p-3">
              Stake
            </Tab>
            <Tab className="text-slate-300 text-lg font-light cursor-pointer hover:bg-fresh focus:outline-none aria-selected:bg-fresh rounded-[14px] border border-fresh p-3">
              Withdraw
            </Tab>
          </Tab.List>
          <Tab.Panels className="p-2">
            <Tab.Panel>
              <Mint />
            </Tab.Panel>
            <Tab.Panel>
              <Burn />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
}
