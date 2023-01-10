import React from "react";
import styles from "./Advantages.module.css";
import cn from "classnames";
import CheckIcon from "./check.svg";
import { TopPageAdvantage } from "../../types/page.interface";

export interface AdvantagesProps {
  advantages: TopPageAdvantage[];
}

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <>
      {advantages.map((a) => (
        <div key={a._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vline} />
          <div>{a.description}</div>
        </div>
      ))}
    </>
  );
};
