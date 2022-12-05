import { useConnect } from "wagmi";
import CoinbaseWalletLogo from "../svgs/CoinbaseWalletLogo";
import MetaMaskLogo from "../svgs/MetaMaskLogo";
import QuestionMark from "../svgs/QuestionMark";
import WalletConnectLogo from "../svgs/WalletConnectLogo";

export default function ConnectWalletModal() {
  const { connect, connectors, error, isLoading } = useConnect();
  function CloseWalletModal() {
    const input = document.getElementById("connectmodal") as HTMLInputElement;
    input.checked = false;
  }
  return (
    <>
      <input type="checkbox" id="connectmodal" className="modal-toggle" />
      <label htmlFor="connectmodal" className="modal cursor-pointer">
        <div className="grid col-auto font-proxima p-6 bg-blackish border text-white border-gray-700 rounded-[24px]">
          <label className="text-2xl md:px-24 px-16 whitespace-nowrap rounded-[12px] font-proxima pb-6 text-almostwhite font-bold p-1">
            <p> Select a wallet </p>
          </label>
          <div className="grid text-xl col-auto p-4 space-y-5 ">
            <button
              className=" border-fresh border bg-grayish rounded-[12px] font-proxima p-3 hover:bg-fresh  "
              onClick={() => {
                connect({ connector: connectors[0] });
              }}
            >
              <div className="flex justify-between">
                <p className="">MetaMask</p>
                <span className="pt-0.5">
                  <MetaMaskLogo />
                </span>
              </div>
            </button>

            <button
              className="border border-fresh bg-grayish rounded-[12px] font-proxima p-3  hover:bg-fresh "
              onClick={() => {
                connect({ connector: connectors[2] });
              }}
            >
              <div className="flex justify-between">
                <p className="">Wallet Connect</p>
                <span className="pt-0.5">
                  <WalletConnectLogo />
                </span>
              </div>
            </button>
            <button
              className="border border-fresh bg-grayish rounded-[12px] font-proxima p-3  hover:bg-fresh "
              onClick={() => {
                connect({ connector: connectors[1] });
              }}
            >
              <div className="flex justify-between">
                <p className="">Coinbase Wallet</p>
                <span className="pt-0.5">
                  <CoinbaseWalletLogo />
                </span>
              </div>
            </button>

            <button
              className="border border-fresh bg-grayish rounded-[12px] font-proxima p-3  hover:bg-fresh tooltip tooltip-bottom tooltip-accent"
              data-tip="Use if your wallet is not specified on the list."
              onClick={() => {
                connect({ connector: connectors[3] });
              }}
            >
              <div className="flex justify-between">
                <p className="">Other Wallet </p>
                <span className="pt-0.5">
                  <QuestionMark />
                </span>
              </div>
            </button>

            <hr className="border-blackish" />
            <hr className="border-gray-700" />
          </div>
          <p className="text-sm text-gray-400 font-semibold text-center">
            Click outside to close
          </p>
        </div>
      </label>
      {isLoading && CloseWalletModal()}
    </>
  );
}
