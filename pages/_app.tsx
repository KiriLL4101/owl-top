import Head from "next/head";
import type { AppProps } from "next/app";
// import { Noto_Sans_KR } from "@next/font/google";
import ym, { YMInitializer } from "react-yandex-metrika";

import "../styles/globals.css";

// const notoSansKR = Noto_Sans_KR({
//   weight: ["300", "400", "500", "700"],
//   style: ["normal"],
//   subsets: ["latin"],
// });

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  router.events.on("routeChangeComplete", (url: string) => {
    if (typeof window !== "undefined") {
      ym("hit", url);
    }
  });
  return (
    <>
      <Head>
        <title>OwnTop - агрегатор курсов</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
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
      <YMInitializer
        accounts={[]}
        options={{ webvisor: true, defer: true }}
        version="2"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
