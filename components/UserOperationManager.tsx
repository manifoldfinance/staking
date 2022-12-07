import Mint from "./Mint";
import Burn from "./Burn";
import React from "react";
import { createContext, useState, useContext } from "react";
import { ethers } from "ethers";
import { useContractRead, useAccount } from "wagmi";
import { FOLD_ADDRESS, XFOLD_ADDRESS } from "../const/contracts";
import { FOLD_ABI } from "../const/foldabi";
import { XFOLD_ABI } from "../const/xfoldabi";
import ApproveFold from "./ApproveFold";
import ApproveXFold from "./ApproveXFold";
import { SelectedTabContext } from "./Tabs";

interface IUserInputContext {
  UserInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
}

export const UserInputContext = createContext<IUserInputContext>(null!);

export default function OperationManager() {
  const { SelectedTab, setSelectedTab } = useContext(SelectedTabContext);
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
    <>
      <UserInputContext.Provider value={{ UserInput, setUserInput }}>
        {SelectedTab == 0 ? (
          parseFloat(USER_INPUT_AMOUNT) <= parseFloat(FOLD_APPROVAL_AMOUNT) ? (
            <Mint />
          ) : (
            <ApproveFold />
          )
        ) : parseFloat(USER_INPUT_AMOUNT) <= parseFloat(XFOLD_APPROVAL_AMOUNT) ? (
          <Burn />
        ) : (
          <ApproveXFold />
        )}
      </UserInputContext.Provider>
    </>
  );
}
