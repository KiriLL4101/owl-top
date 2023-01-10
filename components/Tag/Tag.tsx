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

export const Tag = ({
  size = "m",
  color = "ghost",
  href,
  className,
  children,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.m]: size === "m",
        [styles.s]: size === "s",
        [styles.ghost]: color === "ghost",
        [styles.red]: color === "red",
        [styles.green]: color === "green",
        [styles.grey]: color === "grey",
        [styles.primary]: color === "primary",
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
