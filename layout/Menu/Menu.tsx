import { useState, type KeyboardEvent } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useReducedMotion } from "framer-motion";

import { useMenu } from "../../context/app.context";
import { firstLevelMenu } from "../../helpers/helpers";
import type { FirstLevelMenuItem, PageItem } from "../../types/menu.interface";

import styles from "./Menu.module.css";

export const Menu = () => {
  const { menu, setMenu, firstCategory } = useMenu();

  const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();

  const router = useRouter();

  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
    },
    hidden: { marginBottom: 0 },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code == "Space" || key.code == "Enter") {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu?.(
      menu.map((m) => {
        if (m._id.secondCategory === secondCategory) {
          setAnnounce(m.isOpened ? "closed" : "opened");
          m.isOpened = !m.isOpened;
        }
        return m;
      })
    );
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map((item) => (
          <li key={item.route} aria-expanded={item.id == firstCategory}>
            <Link href={`/${item.route}`}>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: item.id == firstCategory,
                })}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            </Link>
            {item.id == firstCategory && buildSecondLevel(item)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])
          ) {
            m.isOpened = true;
          }
          return (
            <li key={m._id.secondCategory}>
              <button
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondLevelKey(key, m._id.secondCategory)
                }
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                aria-expanded={m.isOpened}
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
                className={cn(styles.secondLevelBlock)}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ) =>
    pages.map((p) => (
      <motion.li key={p._id} variants={variantsChildren}>
        <Link
          tabIndex={isOpened ? 0 : -1}
          href={`/${route}/${p.alias}`}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath,
          })}
          aria-current={
            `/${route}/${p.alias}` == router.asPath ? "page" : false
          }
        >
          {p.category}
        </Link>
      </motion.li>
    ));

  return (
    <nav className={styles.menu} role="navigation">
      {announce && (
        <span role="log" className="visualHidden">
          {announce == "opened" ? "развернуто" : "свернуто"}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};
