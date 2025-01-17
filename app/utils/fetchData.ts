export const fetchProducts = async (query: any) => {
  const { price, search, paging, sort, page } = query;
  const queryParams: Record<string, string> = {};

  queryParams.q = search || undefined;
  queryParams.sort = sort || undefined;
  if (price) queryParams.price = price || undefined;
  if (Number(page) > 1) queryParams.offset = String((Number(page) - 1) * 10);
  queryParams.limit = '10';
  const queryString = new URLSearchParams(queryParams).toString();

  const apiUrl = `https://api.mercadolibre.com/sites/MLA/search?${queryString}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
};