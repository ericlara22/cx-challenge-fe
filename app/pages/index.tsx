import Head from "next/head";
import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";

import ProductCard from "../components/ProductCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }: any) {
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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.q;
  const res = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=10`
  );
  const products = await res.json();

  return { props: { products: products.results } };
};
