import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import cn from "classnames";

import up from "./up.svg";
import close from "./close.svg";
import menu from "./menu.svg";

import styles from "./ButtonIcon.module.css";

const icons = {
  up,
  close,
  menu,
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconName;
  variant: "primary" | "white";
}

export const ButtonIcon = (props: ButtonIconProps): JSX.Element => {
  const { variant, icon, className, ...otherProps } = props;

  const IconComp = icons[icon];

  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: variant == "primary",
        [styles.white]: variant == "white",
      })}
      {...otherProps}
    >
      <IconComp />
    </button>
  );
};
