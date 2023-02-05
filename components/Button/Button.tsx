import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import cn from "classnames";

import ArrowIcon from "./arrow.svg";

import styles from "./Button.module.css";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  variant: "primary" | "ghost";
  arrow?: "right" | "down" | "none";
}

export const Button = (props: ButtonProps): JSX.Element => {
  const { variant, children, className, arrow = "none", ...otherProps } = props;

  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: variant === "primary",
        [styles.ghost]: variant === "ghost",
      })}
      {...otherProps}
    >
      {children}
      {arrow !== "none" && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow === "down",
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};
