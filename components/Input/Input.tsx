import {
  forwardRef,
  type DetailedHTMLProps,
  type ForwardedRef,
  type InputHTMLAttributes,
} from "react";
import type { FieldError } from "react-hook-form";
import cn from "classnames";

import styles from "./Input.module.css";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: FieldError;
}

export const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    const { className, error, ...otherProps } = props;

    return (
      <div className={cn(className, styles.inputWrapper)}>
        <input
          className={cn(styles.input, {
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
