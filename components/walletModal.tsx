import useMetaMaskOnboarding from '@/hooks/useMetaMaskOnboarding';
import useWalletModal from '@/hooks/useWalletModal';
import { injected } from '@/lib/connectors/metamask';
import { walletconnect } from '@/lib/connectors/walletconnect';
import MetaMaskOutline from '@/svgs/MetaMaskOutline';
import WalletConnect from '@/svgs/WalletConnect';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'react-feather';
import toast from 'react-hot-toast';

export default function WalletModal() {
  const isOpen = useWalletModal((state) => state.isOpen);
  const close = useWalletModal((state) => state.close);

  const { isMetaMaskInstalled, isWeb3Available, startOnboarding } =
    useMetaMaskOnboarding();

  async function activateWalletConnect() {
    try {
      await walletconnect.activate();

      close();
    } catch (error) {
      console.error(error);

      toast.error(error.message);
    }
  }

  async function activateInjected() {
    try {
      await injected.activate();

      close();
    } catch (error) {
      console.error(error);

      toast.error(error.message);
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={close}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-primary bg-opacity-80" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-400 ring-1 ring-inset ring-white ring-opacity-10 shadow-xl rounded-2xl text-white">
              <div className="flex justify-between">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Connect Wallet
                </Dialog.Title>

                <button
                  className="rounded focus:outline-none focus:ring-4"
                  onClick={close}
                >
                  <X />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <button
                  onClick={isWeb3Available ? activateInjected : startOnboarding}
                  className="p-4 text-lg leading-5 bg-primary-300 ring-1 ring-white ring-opacity-20 text-white transition-colors w-full rounded-md font-medium focus:outline-none focus:ring-opacity-100 hover:ring-opacity-100 hover:ring-indigo-500 focus:ring-indigo-500"
                >
                  <div className="flex justify-between">
                    <p className="leading-6">
                      {isWeb3Available
                        ? isMetaMaskInstalled
                          ? `MetaMask`
                          : `Wallet`
                        : `Install MetaMask`}
                    </p>

                    <MetaMaskOutline />
                  </div>
                </button>

                <button
                  onClick={activateWalletConnect}
                  className="p-4 text-lg leading-5 bg-primary-300 ring-1 ring-white ring-opacity-20 text-white transition-colors w-full rounded-md font-medium focus:outline-none focus:ring-opacity-100 hover:ring-opacity-100 hover:ring-indigo-500 focus:ring-indigo-500"
                >
                  <div className="flex justify-between">
                    <p className="leading-6">WalletConnect</p>

                    <WalletConnect />
                  </div>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
