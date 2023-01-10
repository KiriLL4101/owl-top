import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Input.module.css";

export interface InputProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input = ({ className, ...props }: InputProps): JSX.Element => {
  return <input className={cn(className, styles.input)} {...props} />;
};
