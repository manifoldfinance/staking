import ConnectAccount from '@/components/connectAccount';
import useWeb3Store from '@/hooks/useWeb3Store';
//import VoteView from '@/views/vote';

function VotePage() {
  const account = useWeb3Store((state) => state.account);

  if (account) return <ConnectAccount />;

  return <ConnectAccount />;
}

export default VotePage;
