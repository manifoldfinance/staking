import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { Toaster } from 'react-hot-toast';
import { useEagerConnect } from '@/hooks/useEagerConnect';

function MyApp({ Component, pageProps }: AppProps) {
  useEagerConnect();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
    
      <Head>
        <title>Manifold Finance</title>
        <meta name="description" content="FOLD Staking DApp and Dashboard" />
      </Head>

      <Navigation />

      <main>
        <Component {...pageProps} />
      </main>

      <Toaster position="bottom-right" reverseOrder={false} />
      </ThemeProvider>
  );
}

export default MyApp;
