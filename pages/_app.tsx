import '../styles/globals.css';
import { AppProps } from "next/app";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
 

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
  publicProvider(),
])
 
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})




const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={client}>
        <Component {...pageProps} />
    </WagmiConfig>
  );
};

export default App;
