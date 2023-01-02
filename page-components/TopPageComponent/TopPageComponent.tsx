import { TopLevelCategory, TopPageModel } from "../../types/page.interface";
import { ProductModel } from "../../types/product.interface";

interface TopPageComponentProps {
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  return <>{products && products.length}</>;
};
