import {
  DetailedHTMLProps,
  Fragment,
  HTMLAttributes,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import cn from "classnames";

import StarIcon from "./star.svg";
import styles from "./Rating.module.css";

interface RatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
}

const Rating = ({
  isEditable = true,
  rating,
  setRating,
  ...props
}: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  );

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((elem, idx) => {
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
    <div {...props}>
      {ratingArray.map((elem, idx) => (
        <Fragment key={idx}>{elem}</Fragment>
      ))}
    </div>
  );
};

export default Rating;
