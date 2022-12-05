import Head from "next/head";
import Navigation from "../components/Navbar";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";
import ConnectWalletModal from "../components/ConnectWalletModal";
export function App() {
  return (
    <>
      <ConnectWalletModal />
      <Head>
        <title>Manifold Finance</title>
        <meta name="keywords" content="Manifold, Manifold Finance, manifold, manifold finance, manifold staking, manifold dapp, staking manifold, fold staking, mainfold finance, mainfold staking"/>
        <meta name="description" content="Manifold Finance Staking Dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navigation />
      <Tabs />
      <Footer />
    </>
  );
}

export default App;
