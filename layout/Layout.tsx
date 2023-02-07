import {
  useRef,
  useState,
  type FunctionComponent,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import cn from "classnames";

import { AppContext, AppContextProvider } from "../context/app.context";
import { Sidebar } from "./Sidebar/Sidebar";
import { Header } from "./Header/Header";
import Footer from "./Footer/Footer";
import { Up } from "../components";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] =
    useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code == "Space" || key.code == "Enter") {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDisplayed(false);
  };

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLinkDisplayed(true)}
        tabIndex={1}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed,
        })}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role="main">
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & AppContext>(
  Component: FunctionComponent<T>
) => {
  return (props: T): JSX.Element => (
    <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
      <Layout>
        <Component {...props} />
      </Layout>
    </AppContextProvider>
  );
};
