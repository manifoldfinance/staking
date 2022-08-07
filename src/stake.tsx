import ConnectAccount from '@/components/connectAccount';
import useWeb3Store from '@/hooks/useWeb3Store';
import StakeView from '@/views/stake';

function StakePage() {
  const account = useWeb3Store((state) => state.account);

  if (account) return <StakeView />;

  return <ConnectAccount />;
}

export default StakePage;
