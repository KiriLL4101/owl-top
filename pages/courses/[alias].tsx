import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";

import { withLayout } from "../../layout/Layout";
import type { MenuItem } from "../../types/menu.interface";
import type {
  TopLevelCategory,
  TopPageModel,
} from "../../types/page.interface";
import type { ProductModel } from "../../types/product.interface";

const firstCategory = 0;

function Course({ menu, products }: CourseProps): JSX.Element {
  return <>{products.length}</>;
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory,
    }
  );
  return {
    paths: menu.flatMap((m) => m.pages.map((p) => "/courses/" + p.alias)),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory,
    }
  );

  const { data: page } = await axios.get<TopPageModel>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias
  );

  const { data: products } = await axios.post<ProductModel[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",
    {
      category: page.category,
      limit: 10,
    }
  );

  return {
    props: {
      menu,
      page,
      products,
      firstCategory,
    },
  };
};

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  page: TopPageModel;
  products: ProductModel[];
  firstCategory: TopLevelCategory;
}
