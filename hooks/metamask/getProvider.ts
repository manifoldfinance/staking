import { MetaMaskInpageProvider } from '@metamask/providers'
import { ethers } from 'ethers'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

const checkMetamask = () =>
  Boolean(typeof window !== 'undefined' && window.ethereum)

export const getProvider = () =>
  checkMetamask()
    ? new ethers.providers.Web3Provider((window as any).ethereum)
    : null