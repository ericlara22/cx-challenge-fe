import Head from "next/head";
import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";

import Header from "@/components/Header";
import ProductsCard from "@/components/ProductsCard";
import PriceFilter from "@/components/PriceFilter";
import { ProductProvider } from "@/context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products, paging, sorting, priceFilter }: any) {
  return (
    <ProductProvider>
      <Head>
        <title>Buscador Mercadolibre</title>
        <meta name="description" content={`Buscador`} />
      </Head>
      <Header />
      <main className="flex">
        <PriceFilter filter={priceFilter} />
        <ProductsCard products={products} sorting={sorting} paging={paging} />
      </main>
    </ProductProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.search;
  const page = context.query.page;
  const offset = page ? Number(page) * 10 : 0;
  const sort = context.query.sort;
  const price = context.query.price || "";

  const res = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=10&offset=${offset}&sort=${sort}&price=${price}`
  );
  const products = await res.json();
  const paging = products.paging;
  const sorting = products.available_sorts;
  const availableFilters = products.available_filters;
  const priceFilter =
    availableFilters.find((filter: any) => filter.id === "price") || false;

  return {
    props: { products: products.results, paging, sorting, priceFilter },
  };
};
