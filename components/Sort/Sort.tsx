import type { DetailedHTMLProps, HTMLAttributes } from "react";

import styles from "./Sort.module.css";
import SortIcon from "./sort.svg";

import cn from "classnames";

interface SortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnum;
  setSort: (sort: SortEnum) => void;
}

export enum SortEnum {
  Rating,
  Price,
}

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => (
  <div className={cn(styles.sort, className)} {...props}>
    <div className={styles.sortName} id="sort">
      Сортировка
    </div>
    <button
      id="rating"
      onClick={() => setSort(SortEnum.Rating)}
      className={cn({
        [styles.active]: sort == SortEnum.Rating,
      })}
      aria-selected={sort == SortEnum.Rating}
      aria-labelledby="sort rating"
    >
      <SortIcon className={styles.sortIcon} />
      По рейтингу
    </button>
    <button
      id="price"
      onClick={() => setSort(SortEnum.Price)}
      className={cn({
        [styles.active]: sort == SortEnum.Price,
      })}
      aria-selected={sort == SortEnum.Price}
      aria-labelledby="sort price"
    >
      <SortIcon className={styles.sortIcon} />
      По цене
    </button>
  </div>
);
