import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

import { Menu } from "../Menu/Menu";

import styles from "./Sidebar.module.css";

interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      {/* <Logo className={styles.logo} />
			<Search /> */}
      <Menu />
    </div>
  );
};

export default Sidebar;
