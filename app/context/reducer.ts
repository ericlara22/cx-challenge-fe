import { AppState, AppAction } from "../types/searchResponse";

export const productReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SET_SORT":
      return {
        ...state,
        sort: action.payload,
      };
    case "SET_AVAILABLE_SORTS":
      return {
        ...state,
        availableSorts: action.payload,
      };
    case "SET_AVAILABLE_PRICES_RANGES":
      return {
        ...state,
        availablePricesRanges: action.payload,
      };
    case "SET_PRICE_RANGE":
      return {
        ...state,
        priceRange: action.payload,
      };
    case "SET_PAGING":
      return {
        ...state,
        paging: action.payload,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};
