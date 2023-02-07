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
    <button
      onClick={() => setSort(SortEnum.Rating)}
      className={cn({
        [styles.active]: sort == SortEnum.Rating,
      })}
      tabIndex={0}
    >
      <SortIcon className={styles.sortIcon} />
      По рейтингу
    </button>
    <button
      onClick={() => setSort(SortEnum.Price)}
      className={cn({
        [styles.active]: sort == SortEnum.Price,
      })}
    >
      <SortIcon className={styles.sortIcon} />
      По цене
    </button>
  </div>
);
