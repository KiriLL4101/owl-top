import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import styles from "./Card.module.css";

export interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: "white" | "blue";
  children: ReactNode;
}

export const Card = ({
  color = "white",
  children,
  className,
  ...props
}: CardProps): JSX.Element => {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.blue]: color == "blue",
      })}
      {...props}
    >
      {children}
    </div>
  );
};
