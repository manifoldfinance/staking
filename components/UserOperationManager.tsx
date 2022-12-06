import { Tab } from "@headlessui/react";
import Mint from "./Mint";
import Burn from "./Burn";
import React from "react";
import { createContext, useState } from "react";
import { ethers } from "ethers";
import { useContractRead, useAccount } from "wagmi";
import { FOLD_ADDRESS, XFOLD_ADDRESS } from "../const/contracts";
import { FOLD_ABI } from "../const/foldabi";
import { XFOLD_ABI } from "../const/xfoldabi";
import ApproveFold from "./ApproveFold";
import ApproveXFold from "./ApproveXFold";

interface IUserInputContext {
  UserInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
}

export const UserInputContext = createContext<IUserInputContext>(null!);

export default function OperationManager() {
  const { address: USER_ADDRESS } = useAccount();
  const [UserInput, setUserInput] = useState();
  const { data: FoldApprovalAmount } = useContractRead({
    address: FOLD_ADDRESS,
    abi: FOLD_ABI,
    functionName: "allowance",
    args: [USER_ADDRESS, XFOLD_ADDRESS],
    watch: true,
  });
  let FOLD_APPROVAL_AMOUNT: any = FoldApprovalAmount;
  const { data: XFoldApprovalAmount } = useContractRead({
    address: XFOLD_ADDRESS,
    abi: XFOLD_ABI,
    functionName: "allowance",
    args: [USER_ADDRESS, FOLD_ADDRESS],
    watch: true,
  });
  let XFOLD_APPROVAL_AMOUNT: any = XFoldApprovalAmount;
  let USER_INPUT_AMOUNT: any;
  if (parseFloat(UserInput) > 0.01) {
    USER_INPUT_AMOUNT = UserInput;
    USER_INPUT_AMOUNT = ethers.utils.parseEther(USER_INPUT_AMOUNT);
  }

  return (
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
        <UserInputContext.Provider value={{ UserInput, setUserInput }}>
          <Tab.Panel>
            {parseFloat(USER_INPUT_AMOUNT) <=
            parseFloat(FOLD_APPROVAL_AMOUNT) ? (
              <Mint />
            ) : (
              <ApproveFold />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {parseFloat(USER_INPUT_AMOUNT) <=
            parseFloat(XFOLD_APPROVAL_AMOUNT) ? (
              <Burn />
            ) : (
              <ApproveXFold />
            )}
          </Tab.Panel>
        </UserInputContext.Provider>
      </Tab.Panels>
    </Tab.Group>
  );
}
