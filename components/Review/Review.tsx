import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import cn from "classnames";

import { Rating } from "../Rating/Rating";
import type { ReviewModel } from "../../types/product.interface";

import UserIcon from "./user.svg";

import styles from "./Review.module.css";

export interface ReviewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: ReviewModel;
}

export const Review = (props: ReviewProps): JSX.Element => {
  const { review, className, ...otherProps } = props;

  const { name, title, description, createdAt, rating } = review;

  return (
    <div className={cn(styles.review, className)} {...otherProps}>
      <UserIcon className={styles.user} />
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(createdAt), "dd MMMM yyyy", { locale: ru })}
      </div>
      <div className={styles.rating}>
        <Rating rating={rating} />
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};
