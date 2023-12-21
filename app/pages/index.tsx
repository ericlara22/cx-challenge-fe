import Head from "next/head";
import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";

import ProductCard from "../components/ProductCard";
import PageSelectorStrip from "@/components/PageSelectorStrip";
import SortComponent from "@/components/SortComponent";
import PriceFilter from "@/components/PriceFilter";

const inter = Inter({ subsets: ["latin"] });

interface PriceFilter {
  id: string;
  name: string;
  values: {
    id: string;
    name: string;
  }[];
}

export default function Home({ products, paging, sorting, priceFilter }: any) {
  return (
    <div>
      <Head>
        <title>Mercado Libre</title>
        <meta name="description" content="Buscador" />
      </Head>

      <div className="flex mb-10">
        <div className="w-1/4 pr-5 min-w-fit">
          {
            priceFilter &&
            <PriceFilter filter={priceFilter} />
          }
        </div>
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
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.search;
  const page = context.query.page;
  const offset = page ? Number(page) * 10 : 0;
  const sort = context.query.sort;
  const price = context.query.price || '';

  const res = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=10&offset=${offset}&sort=${sort}&price=${price}`
  );
  const products = await res.json();
  const paging = products.paging;
  const sorting = products.available_sorts;
  const availableFilters = products.available_filters;
  const priceFilter = availableFilters.find(
    (filter: any) => filter.id === "price"
  ) || false;

  return {
    props: { products: products.results, paging, sorting, priceFilter },
  };
};
