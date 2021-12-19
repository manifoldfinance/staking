import Button from './button';
import useWalletModal from '@/hooks/useWalletModal';

export default function ConnectAccount() {
  const openWalletModal = useWalletModal((state) => state.open);

  return (
    <section className="sm:pt-8 md:pt-16 pb-8 text-white">
      <div className="px-5 max-w-md mx-auto mb-4">
        <div className="bg-primary-400 rounded-xl ring-1 ring-inset ring-white ring-opacity-10 p-4">
          <div className="space-y-4">
            <h1 className="text-lg leading-none font-semibold text-center">
              Manifold Finance FOLD Staking
            </h1>

            <div className="space-y-2 text-gray-300">
              <p></p>

              <p>v0.1.2</p>
            </div>

            <Button onClick={openWalletModal}>{`Connect Wallet`}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
