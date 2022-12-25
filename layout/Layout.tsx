import { FunctionComponent, ReactNode } from "react";

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <div>{children}</div>
      </div>
    </>
  );
};

export const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return (props: T): JSX.Element => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};
