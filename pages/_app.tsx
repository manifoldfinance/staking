import Navigation from '@/components/navigation';
import { useEagerConnect } from '@/hooks/useEagerConnect';
import useFathom from '@/hooks/useFathom';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useFathom();
  useEagerConnect();

  return (
    <>
      <Head>
        <title>Manifold Finance</title>
        <meta name="description" content="FOLD Staking DApp and Dashboard" />
      </Head>

      <Navigation />

      <main>
        <Component {...pageProps} />
      </main>

      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default MyApp;
