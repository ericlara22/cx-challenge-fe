import Head from "next/head";
import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";

import ProductCard from "../components/ProductCard";
import PageSelectorStrip from "@/components/PageSelectorStrip";
import SortComponent from "@/components/SortComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products, paging, sorting, complete }: any) {
  return (
    <div>
      <Head>
        <title>Mercado Libre</title>
        <meta name="description" content="Buscador" />
      </Head>
      <div className="flex justify-end my-4">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.search;
  const page = context.query.page;
  const offset = page ? Number(page) * 10 : 0;
  const sort = context.query.sort;

  const res = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=10&offset=${offset}&sort=${sort}`
  );
  const products = await res.json();
  const paging = products.paging;
  const sorting = products.available_sorts;

  return { props: { products: products.results, paging, sorting, complete: products } };
};
