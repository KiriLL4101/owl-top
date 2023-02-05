import {
  forwardRef,
  type DetailedHTMLProps,
  type ForwardedRef,
  type TextareaHTMLAttributes,
} from "react";
import type { FieldError } from "react-hook-form";
import cn from "classnames";

import styles from "./Textarea.module.css";

interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: FieldError;
}

export const Textarea = forwardRef(
  (
    props: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    const { error, className, ...otherProps } = props;

    return (
      <div className={cn(styles.textareaWrapper, className)}>
        <textarea
          className={cn(styles.textarea, {
            [styles.error]: error,
          })}
          ref={ref}
          {...otherProps}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
