import {
  forwardRef,
  useEffect,
  useState,
  useRef,
  type DetailedHTMLProps,
  type ForwardedRef,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import type { FieldError } from "react-hook-form";
import cn from "classnames";

import StarIcon from "./star.svg";
import styles from "./Rating.module.css";

interface RatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
  error?: FieldError;
}

export const Rating = forwardRef(
  (props: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const {
      isEditable = false,
      error,
      rating,
      setRating,
      tabIndex,
      ...otherProps
    } = props;

    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) return -1;

      if (!rating && i === 0) return tabIndex ?? 0;

      if (r === i + 1) return tabIndex ?? 0;

      return -1;
    };

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((_: JSX.Element, idx: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: idx < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(idx + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(idx + 1)}
            tabIndex={computeFocus(rating, idx)}
            onKeyDown={handleKey}
            ref={(ref) => ratingArrayRef.current?.push(ref)}
            role={isEditable ? "slider" : ""}
            aria-label={isEditable ? "Укажите рейтинг" : "рейтинг" + rating}
            aria-invalid={error ? true : false}
            aria-valuenow={rating}
            aria-valuemax={5}
            aria-valuemin={1}
          >
            <StarIcon />
          </span>
        );
      });
      setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
      if (!isEditable) return;

      constructRating(i);
    };

    const onClick = (i: number) => {
      if (!isEditable || !setRating) return;

      setRating(i);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) return;

      if (e.code == "ArrowRight" || e.code == "ArrowUp") {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code == "ArrowLeft" || e.code == "ArrowDown") {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
