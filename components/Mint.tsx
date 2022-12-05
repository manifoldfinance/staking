import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { XFOLD_ABI } from "../const/xfoldabi";
import { FOLD_ABI } from "../const/foldabi";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useBalance,
  useContractRead,
} from "wagmi";
import {
  XFOLD_ADDRESS,
  FOLD_ADDRESS,
  OPERATOR_ADDRESS,
} from "../const/contracts";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import foldlogo from "../public/foldlogo.png";
import { isMobile } from "react-device-detect";

export default function Mint() {
  const { address: USER_ADDRESS, isConnected: isConnected } = useAccount();
  const [UserInput, setUserInput] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const DebouncedUserInput = useDebounce(UserInput, 500); //catches value 500ms after UserInput stops changing
  let USER_INPUT_AMOUNT;
  let UserInputNoDebounce;
  if (parseFloat(DebouncedUserInput[0]) > 0.01) {
    USER_INPUT_AMOUNT = DebouncedUserInput[0];
    USER_INPUT_AMOUNT = ethers.utils.parseEther(USER_INPUT_AMOUNT);
  }
  if (parseFloat(UserInput) > 0.01) {
    UserInputNoDebounce = UserInput;
    UserInputNoDebounce = ethers.utils.parseEther(UserInputNoDebounce);
  }

  const parseUserInput = (e) => {
    const value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1")
      .replace(/^0[^.]/, "0");
    setUserInput(value);
  };

  const OpenWalletModal = () => {
    const input = document.getElementById("connectmodal") as HTMLInputElement;
    input.checked = true;
  }

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const { data: FoldBal } = useBalance({
    address: USER_ADDRESS,
    token: FOLD_ADDRESS,
    watch: true,
  });
  let ONE_DECIMAL_FOLD_BAL = Math.floor(parseFloat(FoldBal?.formatted) * 10) / 10
  let TWO_DECIMAL_FOLD_BAL = Math.floor(parseFloat(FoldBal?.formatted) * 100) / 100

  const { data: ApprovalAmount } = useContractRead({
    address: FOLD_ADDRESS,
    abi: FOLD_ABI,
    functionName: "allowance",
    args: [USER_ADDRESS, XFOLD_ADDRESS],
    watch: true,
  });
  let anyApprovalAmount: any = ApprovalAmount;

  const {
    config: ApproveConfig,
    error: PrepareApproveError,
    isError: isPrepareErrorApprove,
  } = usePrepareContractWrite({
    address: FOLD_ADDRESS,
    abi: FOLD_ABI,
    functionName: "approve",
    args: [XFOLD_ADDRESS, USER_INPUT_AMOUNT],
    chainId: 1,
    enabled: parseFloat(DebouncedUserInput[0]) > 0.01,
  });
    if (isPrepareErrorApprove) {
    console.log(PrepareApproveError);
  }

  const {
    data: APPROVEDATA,
    write: approve,
  } = useContractWrite(ApproveConfig);

  const { isLoading: isLoadingApprove } =
    useWaitForTransaction({ hash: APPROVEDATA?.hash });

  const {
    config: MintConfig,
  } = usePrepareContractWrite({
    address: XFOLD_ADDRESS,
    abi: XFOLD_ABI,
    functionName: "mint",
    args: [USER_INPUT_AMOUNT, OPERATOR_ADDRESS],
    chainId: 1,
    enabled: parseFloat(DebouncedUserInput[0]) > 0.01,
  });

  const {
    data: MINTDATA,
    write: mint,
  } = useContractWrite(MintConfig);
  const { isLoading: isLoadingMint } =
    useWaitForTransaction({ hash: MINTDATA?.hash });

  if (parseFloat(UserInputNoDebounce) <= parseFloat(anyApprovalAmount)) { //mint
    return (
      <>
        <div className="bg-blackish pb-2 pt-4 font-proxima border-dark-700 rounded-[14px] border border-fresh p-3 gap-4 text-white">
          <label className="text-2xl flex justify-center pb-10">
            Deposit FOLD
          </label>
          <div className="p-2 mb-1 flex justify-between px-1.5">
            <div className="inline-flex relative items-center py-2 pr-3 pl-2 mr-2 space-x-2 ring-1 ring-fresh text-lg leading-6 rounded-xl shrink-0 cursor-default">
              <Image
                className="w-6 h-6 rounded-full"
                src={foldlogo}
                width={24}
                height={24}
              />
              <p className="block font-medium"> FOLD </p>
            </div>
            <input
              className="bg-transparent appearance-none border-none focus:ring-none focus:border-none after:border-none text-left text-2xl flex font-proxima w-full h-10 focus:outline-none text-white p-2"
              inputMode="decimal"
              pattern="^[0-9]*[.,]?[0-9]*$"
              value={UserInput}
              placeholder="0.0"
              required={true}
              onChange={(e) => {
                parseUserInput(e);
              }}
              minLength={1}
              maxLength={79}
              spellCheck="false"
              disabled={isHydrated && !isConnected}
            />
            <div className="shrink-0 space-x-1 inline-flex pt-1 relative items-center">
              {isHydrated && (
                <div className="text-gray-300">
                  {!isMobile && (<p> Balance: {ONE_DECIMAL_FOLD_BAL >= 100 ? ONE_DECIMAL_FOLD_BAL : TWO_DECIMAL_FOLD_BAL} </p> )}
                  {isMobile && (<p> Bal: {ONE_DECIMAL_FOLD_BAL >= 100 ? ONE_DECIMAL_FOLD_BAL : TWO_DECIMAL_FOLD_BAL} </p> )}
                </div>
              )}
              <button
                className="text-indigo-500 focus:underline hover:underline"
                onClick={() => ONE_DECIMAL_FOLD_BAL >= 100 ? setUserInput(ONE_DECIMAL_FOLD_BAL.toString()) : setUserInput(TWO_DECIMAL_FOLD_BAL.toString())}
              >
                (Max)
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <button
            className="text-white font-medium hover:text-white border border-fresh hover:bg-fresh rounded-lg text-base px-5 py-3.5 text-center mb-2 w-full"
            disabled={
              isLoadingApprove ||
              parseFloat(UserInput) < 0.01
            }
            onClick={() => {
              isConnected ? mint?.() : OpenWalletModal();
            }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {isLoadingMint ? (
              <p> Depositing... </p>
            ) : parseFloat(UserInput) >
              TWO_DECIMAL_FOLD_BAL ? (
              <p> Amount exceeds balance </p>
            ) : parseFloat(UserInput) >= 0 ? (
              <p> Deposit </p>
            ) : parseFloat(UserInput) < 0.01 ? (
              <p> Minimum amount is 0.01 </p>
            ) : isHydrated && !isConnected ? (
              <p> Connect Wallet </p>
            ) : (
              <p> Enter an amount </p>
            )}
          </button>
        </div>
        {isLoadingMint && (
          <div className="toast">
            <div className="alert bg-fresh font-medium border border-blackish py-4 px-9 text-almostwhite">
              <div>
                <p>Depositing...</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return ( //approve
    <>
      <div className="bg-blackish pb-2 pt-4 font-proxima border-dark-700 rounded-[14px] border border-fresh p-3 gap-4 text-white">
        <label className="text-2xl flex justify-center pb-10">
          Deposit FOLD
        </label>
        <div className="p-2 mb-1 flex justify-between px-1.5">
          <div className="inline-flex relative items-center py-2 pr-3 pl-2 mr-2 space-x-2 ring-1 ring-fresh text-lg leading-6 rounded-xl shrink-0 cursor-default">
            <Image
              className="w-6 h-6 rounded-full"
              src={foldlogo}
              width={24}
              height={24}
            />
            <p className="block font-medium"> FOLD </p>
          </div>
          <input
            className="bg-transparent appearance-none border-none focus:ring-none focus:border-none after:border-none text-left text-2xl flex font-proxima w-full h-10 focus:outline-none text-white p-2"
            inputMode="decimal"
            pattern="^[0-9]*[.,]?[0-9]*$"
            value={UserInput}
            placeholder="0.0"
            required={true}
            onChange={(e) => {
              parseUserInput(e);
            }}
            minLength={1}
            maxLength={79}
            spellCheck="false"
            disabled={isHydrated && !isConnected}
          />
          <div className="shrink-0 space-x-1 inline-flex pt-1 relative items-center">
            {isHydrated && (
              <div className="text-gray-300">
                {!isMobile && (<p> Balance: {ONE_DECIMAL_FOLD_BAL >= 100 ? ONE_DECIMAL_FOLD_BAL : TWO_DECIMAL_FOLD_BAL} </p> )}
                {isMobile && (<p> Bal: {ONE_DECIMAL_FOLD_BAL >= 100 ? ONE_DECIMAL_FOLD_BAL : TWO_DECIMAL_FOLD_BAL} </p> )}
              </div>
            )}
            <button
              className="text-indigo-500 focus:outline-none hover:underline"
              onClick={() => ONE_DECIMAL_FOLD_BAL >= 100 ? setUserInput(ONE_DECIMAL_FOLD_BAL.toString()) : setUserInput(TWO_DECIMAL_FOLD_BAL.toString())}
            >
              (Max)
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <button
          className="text-white font-medium hover:text-white border border-fresh hover:bg-fresh rounded-lg text-base px-5 py-3.5 text-center mb-2 w-full"
          disabled={
            isLoadingApprove ||
            parseFloat(UserInput) < 0.01
          }
          onClick={() => {
            isConnected ? approve?.() : OpenWalletModal();
          }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {isLoadingApprove ? (
            <p> Approving... </p>
          ) : parseFloat(UserInput) > 0 ? (
            <p> Approve </p>
          ) : parseFloat(UserInput) < 0.01 ? (
            <p> Minimum amount is 0.01 </p>
          ) : isHydrated && !isConnected ? (
            <p> Connect Wallet </p>
          ) : (
            <p> Enter an amount </p>
          )}
        </button>
      </div>
      {isLoadingApprove && (
        <div className="toast">
          <div className="alert bg-fresh border font-medium border-blackish py-4 px-9 text-almostwhite">
            <div>
              <p>Approving...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
