import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import axios from "axios";
import { ParsedUrlQuery } from "node:querystring";

import { withLayout } from "../../layout/Layout";
import { firstLevelMenu } from "../../helpers/helpers";
import { TopPageComponent } from "../../page-components";
import { TopLevelCategory, TopPageModel } from "../../types/page.interface";
import { API } from "../../helpers/api";
import { Error404 } from "../404";
import type { MenuItem } from "../../types/menu.interface";
import type { ProductModel } from "../../types/product.interface";

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
  if (!page || !products) {
    return <Error404 />;
  }

  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="article" />
      </Head>
      <TopPageComponent
        firstCategory={firstCategory}
        page={page}
        products={products}
      />
    </>
  );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const item of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: item.id,
    });
    paths = paths.concat(
      menu.flatMap((s) => s.pages.map((p) => `/${item.route}/${p.alias}`))
    );
  }
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }
  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    });
    if (menu.length == 0) {
      return {
        notFound: true,
      };
    }
    const { data: page } = await axios.get<TopPageModel>(
      API.topPage.byAlias + params.alias
    );
    const { data: products } = await axios.post<ProductModel[]>(
      API.product.find,
      {
        category: page.category,
        limit: 10,
      }
    );

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
