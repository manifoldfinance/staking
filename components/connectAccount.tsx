import Button from './button';
import useWalletModal from '@/hooks/useWalletModal';

export default function ConnectAccount() {
  const openWalletModal = useWalletModal((state) => state.open);

  return (
    <section className="pb-8 text-white sm:pt-8 md:pt-16">
      <div className="px-5 mx-auto mb-4 max-w-md">
        <div className="p-4 rounded-xl ring-1 ring-inset ring-white ring-opacity-10 bg-primary-400">
          <div className="space-y-4">
            <h1 className="text-lg font-semibold leading-none text-center">
              Manifold Finance
            </h1>

            <div className="space-y-2 text-gray-300">
              <p></p>

              <p>v0.1.5</p>
            </div>

            <Button onClick={openWalletModal}>{`Connect Wallet`}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
