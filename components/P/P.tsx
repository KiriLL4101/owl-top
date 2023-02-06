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
  <p className={cn(styles.p, className, styles[size])} {...props}>
    {children}
  </p>
);

export default P;
