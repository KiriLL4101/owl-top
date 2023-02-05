import {
  forwardRef,
  useEffect,
  useState,
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
      ...otherProps
    } = props;

    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    useEffect(() => {
      constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((rate: JSX.Element, idx: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: idx < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(idx + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(idx + 1)}
          >
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGElement>) =>
                isEditable && handleSpace(idx + 1, e)
              }
            />
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

    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
      if (e.code != "Space" || !setRating) return;

      setRating(i);
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
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
