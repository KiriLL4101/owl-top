import cn from "classnames";

import { useMenu } from "../../context/app.context";
import type { FirstLevelMenuItem, PageItem } from "../../types/menu.interface";
import { TopLevelCategory } from "../../types/page.interface";

import BooksIcon from "./icon/book.svg"; // books.svg
import CoursesIcon from "./icon/courses.svg";
import ProductsIcon from "./icon/products.svg";
import ServicesIcon from "./icon/services.svg";

import styles from "./Menu.module.css";

const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: "courses",
    name: "Курсы",
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: "services",
    name: "Сервисы",
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: "books",
    name: "Книги",
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: "products",
    name: "Продукты",
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
];

export const Menu = () => {
  const { menu, firstCategory } = useMenu();

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((menu) => (
          <div key={menu.id}>
            <a href={`/${menu.route}`}>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: menu.id === firstCategory,
                })}
              >
                {menu.icon}
                <span>{menu.name}</span>
              </div>
            </a>
            {menu.id === firstCategory && buildSecondLevel(menu)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (firstLevelMenu: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((menuItem) => (
          <div key={menuItem._id.secondCategory}>
            <div className={styles.secondLevel}>
              {menuItem._id.secondCategory}
            </div>
            <div
              className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpened]: menuItem?.isOpened,
              })}
            >
              {buildThirdLevel(menuItem.pages, firstLevelMenu.route)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      <div>
        {pages.map((p) => (
          <a
            href={`/${route}/${p.alias}`}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: false,
            })}
          >
            {p.category}
          </a>
        ))}
      </div>
    );
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
