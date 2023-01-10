import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Divider.module.css";

export interface DividerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {}

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
  return <hr className={cn(className, styles.hr)} {...props} />;
};
