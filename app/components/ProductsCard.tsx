import ProductRow from "./ProductRow";
import PageSelectorStrip from "./PageSelectorStrip";
import SortComponent from "./SortComponent";

import { useProductContext } from "@/context/ProductContext";
import { Product } from "@/types/product";

export default function ProductsCard() {
  const { state } = useProductContext();

  const products = state.products;

  return (
    <div className="w-3/4">
      <div className="flex justify-end">
        <SortComponent />
      </div>
      <div className=" bg-white shadow-lg rounded-lg pt-2">
        {products.map((product: Product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </div>
      <PageSelectorStrip />
    </div>
  );
}
