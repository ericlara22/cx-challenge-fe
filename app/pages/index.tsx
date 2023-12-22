import { useEffect } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";

import { fetchDataToContext, fetchData } from "@/utils/fetchData";

import Header from "@/components/Header";
import ProductsCard from "@/components/ProductsCard";
import PriceFilter from "@/components/PriceFilter";
import { ProductProvider, useProductContext } from "@/context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ state }: any) {
  return (
    <ProductProvider initialState={state}>
      <Head>
        <title>Buscador Mercadolibre</title>
        <meta name="description" content={`Buscador`} />
      </Head>
      <Header />
      <main className="flex px-5 m-auto max-w-screen-xlx">
        <PriceFilter />
        <ProductsCard />
      </main>
    </ProductProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const state = await fetchData(query);

  return {
    props: { state },
  };
};
