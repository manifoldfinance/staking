import foldlogo from "../public/foldlogo.png";
import Image from "next/image";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import { isMobile } from 'react-device-detect';

export default function Navigation() {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  function OpenWalletModal() {
    const input = document.getElementById("connectmodal") as HTMLInputElement;
    input.checked = true;
  }
  const { address: USER_ADDRESS, isConnected: isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <>
      <input type="checkbox" id="FAQMODAL" className="modal-toggle" />
      <label htmlFor="FAQMODAL" className="modal cursor-pointer">
        <label
          className="relative bg-blackish border border-grayrose p-6 rounded-[12px] "
          htmlFor=""
        >
          <h3 className="text-2xl font-proxima rounded-md p-2 text-center text-almostwhite font-bold">
            Frequently asked questions
          </h3>
          <ul className="space-y-6 text-lg text-white">
            <li className="mt-9 p-2 rounded-lg border border-grayrose bg-grayrose">
              Where do tributes come from? <br /> <p className="pl-1.5">
              <a
                className="hover:underline"
                href="https://kb.manifoldfinance.com/docs/general/general-token"
              >
                <strong className="text-almostwhite"> - Click me to view explanatory docs page. </strong>
              </a>
              </p>
            </li>
    
            <li className="p-2 rounded-lg border border-grayrose bg-grayrose">
              What is current yield? <br />
              <p className="pl-1.5"> <strong className="text-almostwhite"> - Theres no tribute distribution at the moment.</strong> </p>
            </li>
            <li className="p-2 rounded-lg border border-grayrose bg-grayrose">
              Is there a lock on staking? <br /> <p className="pl-1.5"> <strong className="text-almostwhite"> - 24h. </strong> </p>
            </li>
          </ul>
          <hr className="border-gray-700 mt-9 pb-4" />
          <p className="text-sm text-gray-400 font-semibold text-center">
            Click outside to close
          </p>
        </label>
      </label>
      <section className="bg-grayish p-2 border-black shadow-sm shadow-grayish">
        <div className="container grid col-auto md:p-1.5 md:pt-1.5 pt-2 justify-center md:flex md:flex-wrap items-center md:justify-between mx-auto">
          <a href="https://manifoldfinance.com/" className="flex items-center">
            {isHydrated && !isMobile &&
              <Image
                src={foldlogo}
                className="w-10 h-10 sm:h-9"
                alt="Manifold Logo"
                width="48"
                height="48"
              />
              }
            <span className="self-center md:ml-0.5 text-white font-light md:font-light text-2xl font-proxima whitespace-nowrap ">
              Manifold Finance
            </span>
          </a>
          {isHydrated && !isMobile &&
            <div className="flex md:order-2">
              {isHydrated && !isConnected ? (
                <div className="text-white hover:bg-fresh border border-fresh font-medium text-light rounded-lg text-center mr-3 md:mr-0 ">
                  <button
                    onClick={() => OpenWalletModal()}
                    className="px-[45px] py-3 text-center"
                  >
                    <p> Connect Wallet </p>
                  </button>
                </div>
              ) : (
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="px-[41px] p-3 border border-fresh hover:bg-fresh text-almostwhite text-light lowercase rounded-[36px] justify-between flex"
                  >
                    {isHydrated && (
                      <p>
                        {USER_ADDRESS?.substring(0, 6)}...
                        {USER_ADDRESS?.substring(38, 42)}
                      </p>
                    )}
                    <svg
                      className="ml-2 w-4 h-4 mt-1.5"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content bg-fresh hover:brightness-125 border border-gray-700 text-almostwhite p-2 shadow rounded-box w-52"
                  >
                    <li>
                      <button
                        className="w-full h-full"
                        onClick={() => disconnect()}
                      >
                        Disconnect
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          }
          <div className="flex md:w-auto md:order-1 justify-center p-4 text-white font-light rounded-lg flex-row md:space-x-8 md:border-0 md:bg-transparent">
            <p>
              <label
                htmlFor="FAQMODAL"
                className="block py-2 md:mr-[20px] text-lg border md:border-none border-fresh rounded-[12px] p-5 text-rounded hover:text-indigo-500 md:p-0 cursor-pointer"
              >
                Staking FAQ
              </label>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
