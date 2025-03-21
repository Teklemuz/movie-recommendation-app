// pages/_app.tsx
import { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/GlobalStyle';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <NavBar /> {}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
