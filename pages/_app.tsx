import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import MetaMaskProvider from '../providers/MetaMaskProvider';
import Home from '.';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Coinwatch</title>
      </Head>
      <MetaMaskProvider>
        <Component {...pageProps} />
      </MetaMaskProvider>
    </>
  );
}

export default MyApp;
