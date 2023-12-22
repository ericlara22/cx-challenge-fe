import { SearchResponse, AppAction } from "@/types/searchResponse";

export const fetchData = async (query: string, dispatch: React.Dispatch<AppAction>) => {
  
 
    const res = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    const data = await res.json();
    setContextState(data, dispatch);
    return data;
};

export const getProducts = async (context: any) => {
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

  return { products, paging, sorting, priceFilter };
};

const setContextState = (
  data: SearchResponse,
  dispatch: React.Dispatch<AppAction>
) => {
  dispatch({ type: "SET_PRODUCTS", payload: data.results });
  dispatch({ type: "SET_AVAILABLE_SORTS", payload: data.available_sorts });
  dispatch({ type: "SET_SORT", payload: data.available_sorts[0].id });
};
