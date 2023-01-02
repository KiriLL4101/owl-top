import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

import { Menu } from "../Menu/Menu";

import styles from "./Sidebar.module.css";
import Logo from "../logo.svg";

interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <div>поиск</div>
      <Menu />
    </div>
  );
};

export default Sidebar;
