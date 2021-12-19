import * as Fathom from 'fathom-client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SITE_ID = 'BDJWGKKF';

export default function useFathom() {
  const router = useRouter();

  useEffect(() => {
    Fathom.load(SITE_ID, {
      includedDomains: ['app.manifold.finance'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);
}
