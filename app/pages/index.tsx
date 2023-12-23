import { useEffect } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";

import { fetchProducts } from "@/utils/fetchData";

import Header from "@/components/Header";
import ProductsCard from "@/components/ProductsCard";
import PriceFilter from "@/components/PriceFilter";
import { useProductContext } from "@/context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products, queryValues }: any) {
  const { dispatch } = useProductContext();

  useEffect(() => {
    dispatch({ type: "SET_PRODUCTS", payload: products.results });
    dispatch({
      type: "SET_AVAILABLE_SORTS",
      payload: products.available_sorts,
    });
    dispatch({
      type: "SET_AVAILABLE_PRICES_RANGES",
      payload: products.available_filters.find((el: any) => el.id === "price"),
    });
    dispatch({ type: "SET_SEARCH_QUERY", payload: queryValues.search });
    dispatch({ type: "SET_SORT", payload: queryValues.sort });
    dispatch({  type: "SET_PRICE_RANGE", payload: queryValues.price });
    dispatch({ type: "SET_PAGE", payload: Number(queryValues.page) });
    dispatch({ type: "SET_PAGING", payload: products.paging });
  }, [products, queryValues, dispatch]);

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

export async function getServerSideProps({ query }: any) {
  const { sort = "relevance", price = "", search = "", page = 1 } = query;
  const products = await fetchProducts(query);

  const queryValues = {
    sort,
    price: {
      min: price.split("-")[0] || '',
      max: price.split("-")[1] || '',
    },
    search,
    page,
  };

  return { props: { products, queryValues } };
}
