import { injected } from '@/lib/connectors/metamask';
import isMobile from '@/utils/isMobile';
import { useEffect, useState } from 'react';
import useWeb3Store, { State } from './useWeb3Store';

const selector = (state: State) => state.active;

export function useEagerConnect() {
  const active = useWeb3Store(selector);

  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (!active) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          injected.activate().catch(() => {
            setTried(true);
          });
        } else {
          if (isMobile && window.ethereum) {
            injected.activate().catch(() => {
              setTried(true);
            });
          } else {
            setTried(true);
          }
        }
      });
    }
  }, [active]);

  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}
