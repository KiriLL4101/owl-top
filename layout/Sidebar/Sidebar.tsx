import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

import { Menu } from "../Menu/Menu";
import { Search } from "../../components";
import Logo from "../logo.svg";

import styles from "./Sidebar.module.css";

interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <Search />
      <Menu />
    </div>
  );
};
