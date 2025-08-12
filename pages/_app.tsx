import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { HintProvider } from '../contexts/HintContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HintProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </HintProvider>
  );
}
