// utilities/fetchData.ts

import { Dispatch } from 'react';

export const fetchDataToContext = async (dispatch: Dispatch<any>) => {
  try {
    // Fetch data from your API or external source
    const response = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=some_query');
    const data = await response.json();

    // Update the context with the fetched data
    dispatch({ type: 'SET_PRODUCTS', payload: data.results });
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle errors as needed
  }
};

// utils/fetchData.ts

export const fetchData = async (query: any) => {
  const { search, page, sort, price } = query;

  // Create an object to store defined parameters
  const queryParams: Record<string, string> = {};

  // Add parameters only if they are defined
  if (page) queryParams.offset = (Number(page) * 10).toString();
  if (sort) queryParams.sort = sort;
  if (price) queryParams.price = price;
  const [ min, max ] = price?.split('-') || [0, 0];
  
  queryParams.q = search;
  queryParams.limit = '10';

  // Create the query string
  const queryString = new URLSearchParams(queryParams).toString();

  const apiUrl = `https://api.mercadolibre.com/sites/MLA/search?${queryString}`;

  const res = await fetch(apiUrl);
  const products = await res.json();
  const sorting = products.available_sorts;
  const availableFilters = products.available_filters;
  const priceFilter =
  availableFilters?.find((filter: any) => filter.id === 'price') || {id: '', name: '', type: '', values: []};
  
  const state = {
    paging: products.paging,
    products: products.results,
    searchQuery: search || '',
    sort: sort || '',
    availableSorts: sorting,
    priceRange: { min, max },
    availablePricesRanges: priceFilter,
  };

  return state;
};

