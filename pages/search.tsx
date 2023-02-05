import { GetStaticProps } from "next";
import React from "react";
import axios from "axios";

import { withLayout } from "../layout/Layout";
import { MenuItem } from "../types/menu.interface";
import { API } from "../helpers/api";

function Search(): JSX.Element {
  return <>Search</>;
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
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
