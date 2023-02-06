import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import styles from "./Tag.module.css";

interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: "s" | "m";
  color?: "primary" | "ghost" | "red" | "grey" | "green";
  href?: string;
  children: ReactNode;
}

export const Tag = (props: TagProps): JSX.Element => {
  const {
    size = "m",
    color = "ghost",
    href,
    className,
    children,
    ...otherProps
  } = props;

  return (
    <div
      className={cn(styles.tag, className, styles[size], styles[color])}
      {...otherProps}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
