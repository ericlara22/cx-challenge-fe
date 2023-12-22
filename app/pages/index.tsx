import { useEffect } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";

import { fetchDataToContext } from "@/utils/fetchData";

import Header from "@/components/Header";
import ProductsCard from "@/components/ProductsCard";
import PriceFilter from "@/components/PriceFilter";
import { useProductContext } from "@/context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home(context: any) {

  const { state, dispatch } = useProductContext();

  useEffect(() => {
    fetchDataToContext(state, dispatch);
  }, [state.searchQuery, state.sort, state.priceRange, state.page]);

  return (
    <>
      <Head>
        <title>Buscador Mercadolibre</title>
        <meta name="description" content={`Buscador`} />
      </Head>
      <Header />
      <main className="flex px-5 m-auto max-w-screen-xl">
        <PriceFilter />
        <ProductsCard />
      </main>
    </>
  );
}
