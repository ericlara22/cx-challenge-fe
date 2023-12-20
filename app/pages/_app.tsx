import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GetServerSideProps } from 'next'
import { ProductProvider } from "@/context/ProductContext";
import Layout from "../components/layout";

export default function App({ Component, pageProps }: AppProps) {
  const initialProducts = pageProps?.products || [];
  return (
    <ProductProvider initialProducts={initialProducts}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProductProvider>
  );
}
