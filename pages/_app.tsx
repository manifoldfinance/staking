import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import { Toaster } from 'react-hot-toast';
import { useEagerConnect } from '@/hooks/useEagerConnect';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEagerConnect();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>Manifold Finance</title>
        <meta name="description" content="FOLD Staking DApp and Dashboard" />
      </Head>
      <meta
        name="ui-version"
        content={`${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}`}
      />
      <Navigation />

      <main>
        <Component {...pageProps} />
      </main>

      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default MyApp;
