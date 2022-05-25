import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import MetaMaskProvider from '../providers/MetaMaskProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JwtCookieProvider from '../providers/JwtCookieProvider';
import { HeaderMenu } from '../components/HeaderMenu';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Coinwatch</title>
      </Head>
      <ToastContainer></ToastContainer>

      <MetaMaskProvider>
        <JwtCookieProvider>
          <HeaderMenu></HeaderMenu>
          <Component {...pageProps} />
        </JwtCookieProvider>
      </MetaMaskProvider>
    </>
  );
}

export default MyApp;
