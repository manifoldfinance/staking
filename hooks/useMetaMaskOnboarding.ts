import detectEthereumProvider from '@metamask/detect-provider';
import { useEffect, useState } from 'react';

export default function useMetaMaskOnboarding() {
  const [isMetaMaskInstalled, isMetaMaskInstalledSet] = useState<boolean>();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    async function checkForMetaMask() {
      const provider = await detectEthereumProvider({
        timeout: 1000,
        mustBeMetaMask: true,
      });

      if (provider) {
        isMetaMaskInstalledSet(true);
      } else {
        isMetaMaskInstalledSet(false);
      }
    }

    checkForMetaMask();
  }, []);

  async function startOnboarding() {
    const MetaMaskOnboarding = await import('@metamask/onboarding').then(
      (m) => m.default,
    );

    const onboarding = new MetaMaskOnboarding();

    onboarding.startOnboarding();
  }

  const isWeb3Available = typeof window !== 'undefined' && window?.ethereum;

  return {
    startOnboarding,
    isMetaMaskInstalled,
    isWeb3Available,
  };
}
