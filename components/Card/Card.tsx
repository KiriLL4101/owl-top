import {
  forwardRef,
  type DetailedHTMLProps,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import cn from "classnames";

import styles from "./Card.module.css";

export interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: "white" | "blue";
  children: ReactNode;
}

export const Card = forwardRef(
  (props: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const { color = "white", children, className, ...otherProps } = props;
    return (
      <div
        className={cn(styles.card, className, {
          [styles.blue]: color == "blue",
        })}
        ref={ref}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
);
