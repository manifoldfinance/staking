import Button from './button';
import useWalletModal from '@/hooks/useWalletModal';
process.env.NEXT_PUBLIC_COMMIT;

export default function ConnectAccount() {
  const openWalletModal = useWalletModal((state) => state.open);

  return (
    <section className="pb-8 text-white sm:pt-8 md:pt-16">
      <div className="px-5 mx-auto mb-4 max-w-md">
        <div className="p-4 rounded-xl ring-1 ring-inset ring-white ring-opacity-10 bg-primary-400">
          <div className="space-y-4">
            <h1 className="text-lg font-semibold leading-none text-center">
              Manifold Finance v1
            </h1>

            <div className="space-y-2 text-gray-300">
              <br />
              <br />
              <h3 className="text-lg font-semibold leading-none text-center">
                Use your FOLD to mint xFOLD and get staking rewards
              </h3>
              <br />
              <br />
<<<<<<< HEAD
              <p>release v.0.7.2. - v2022.01.02 </p>
              <p>evtag: bc02400352968b9490fa23f3348313093e972a01</p>
||||||| c5faaf2
              <p>release v.0.6.0</p>
=======

              <p>🌀 💊 🔵 🍣</p>
              <p></p>
>>>>>>> trunk
            </div>

            <Button onClick={openWalletModal}>{`Connect Wallet`}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
