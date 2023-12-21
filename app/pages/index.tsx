import Head from "next/head";
import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";

import ProductCard from "../components/ProductCard";
import PageSelectorStrip from "@/components/PageSelectorStrip";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products, paging }: any) {
  return (
    <div>
      <Head>
        <title>Mercado Libre</title>
        <meta name="description" content="Buscador" />
      </Head>
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

  const res = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=10&offset=${offset}`
  );
  const products = await res.json();
  const paging = products.paging;

  return { props: { products: products.results, paging } };
};
