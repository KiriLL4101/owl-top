import type { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Textarea.module.css";

interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

export const Textarea = ({
  className,
  ...props
}: TextareaProps): JSX.Element => {
  return <textarea className={cn(className, styles.input)} {...props} />;
};
