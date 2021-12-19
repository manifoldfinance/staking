import ConnectAccount from '@/components/connectAccount';
import MintView from '@/views/mint';
import useWeb3Store from '@/hooks/useWeb3Store';

function MintPage() {
  const account = useWeb3Store((state) => state.account);

  if (account) return <MintView />;

  return <ConnectAccount />;
}

export default MintPage;
