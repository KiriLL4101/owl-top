import { GetStaticProps } from "next";
import axios from "axios";

import { Button } from "../components";
import { Rating } from "../components/Rating/Rating";
import { withLayout } from "../layout/Layout";

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export interface PageItem {
  alias: string;
  title: string;
  _id: string;
  category: string;
}

export interface MenuItem {
  _id: {
    secondCategory: string;
  };
  isOpened?: boolean;
  pages: PageItem[];
}

export interface FirstLevelMenuItem {
  route: string;
  name: string;
  icon: JSX.Element;
  id: TopLevelCategory;
}

function Home({ menu, firstCategory }: HomeProps) {
  return (
    <>
      <main>
        <Button variant="ghost" arrow="right">
          Кнопка
        </Button>
        <Rating rating={4} />
      </main>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;

  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory,
    }
  );

  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
