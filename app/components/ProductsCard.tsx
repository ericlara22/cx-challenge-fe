import ProductCard from "./ProductCard";
import PageSelectorStrip from "./PageSelectorStrip";
import SortComponent from "./SortComponent";

export default function ProductsCard({ products, sorting, paging }: any) {
  return (
    <div className="w-3/4">
      <div className="flex justify-end">
        <SortComponent sorting={sorting} />
      </div>
      <div className=" bg-white shadow-lg rounded-lg pt-2">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <PageSelectorStrip total={paging.total} />
    </div>
  );
}
