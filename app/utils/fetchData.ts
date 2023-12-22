import { AppState } from "../types/searchResponse";
import { Dispatch } from "react";

export const fetchDataToContext = async (
  state: AppState,
  dispatch: Dispatch<any>
) => {
  try {
    const {
      priceRange,
      searchQuery,
      paging,
      sort,
      page,
    } = state;

    // Create an object to store defined parameters
    const queryParams: Record<string, string> = {};

    queryParams.q = searchQuery || undefined;
    queryParams.limit = `${paging.limit}`;
    queryParams.offset = `${paging.offset + page * paging.limit}`;

    if(sort) queryParams.sort = sort;
    if(priceRange.max && priceRange.min) queryParams.price = `${priceRange.min}-${priceRange.max}`;

    console.log(queryParams.offset)
    // Create the query string
    const queryString = new URLSearchParams(queryParams).toString();
  
    const apiUrl = `https://api.mercadolibre.com/sites/MLA/search?${queryString}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    const priceFilters = data.available_filters.find(
      (filter: any) => filter.id === "price"
    ) || { id: "", name: "", type: "", values: [] };

    // Update the context with the fetched data
    dispatch({ type: "SET_PRODUCTS", payload: data.results });
    dispatch({ type: "SET_AVAILABLE_SORTS", payload: data.available_sorts });
    dispatch({ type: "SET_SEARCH_QUERY", payload: searchQuery });
    dispatch({ type: "SET_SORT", payload: sort });
    dispatch({ type: "SET_AVAILABLE_PRICES_RANGES", payload: priceFilters });
    dispatch({ type: "SET_PRICE_RANGE", payload: priceRange });
    dispatch({ type: "SET_PAGE", payload: page });
    dispatch({ type: "SET_PAGING", payload: data.paging });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors as needed
  }
};
