import ProductCard from "./ProductCard";
import PageSelectorStrip from "./PageSelectorStrip";
import SortComponent from "./SortComponent";

import { useProductContext } from "@/context/ProductContext";

export default function ProductsCard() {
  const { state, dispatch } = useProductContext();

  const products = state.products;

  return (
    <div className="w-3/4">
      <div className="flex justify-end">
        <SortComponent />
      </div>
      <div className=" bg-white shadow-lg rounded-lg pt-2">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <PageSelectorStrip />
    </div>
  );
}
