import { FunctionComponent, ReactNode } from "react";

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
  return (
    <div className={styles.wrapper}>
      <Header />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body}>{children}</main>
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
