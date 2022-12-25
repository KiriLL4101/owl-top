import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import styles from "./P.module.css";

interface PProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: ReactNode;
  size?: "s" | "m" | "l";
}

const P = ({
  size = "m",
  className,
  children,
  ...props
}: PProps): JSX.Element => (
  <p
    className={cn(styles.p, className, {
      [styles.m]: size === "m",
      [styles.l]: size === "l",
      [styles.s]: size === "s",
    })}
    {...props}
  >
    {children}
  </p>
);

export default P;
