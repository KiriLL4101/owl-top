import Head from "next/head";
import type { AppProps } from "next/app";
// import { Noto_Sans_KR } from "@next/font/google";

import "../styles/globals.css";

// const notoSansKR = Noto_Sans_KR({
//   weight: ["300", "400", "500", "700"],
//   style: ["normal"],
//   subsets: ["latin"],
// });

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>OwnTop - агрегатор курсов</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
        />
        <meta property="og:locale" content="ru_RU" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
