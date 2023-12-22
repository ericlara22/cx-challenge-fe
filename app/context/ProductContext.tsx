import { createContext, useContext, FC, ReactNode, Dispatch, useReducer } from 'react';
import { Product } from '@/types/product';
import { AppState, AppAction } from '@/types/searchResponse';
interface ProductContextProps {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const initialState: AppState = {
  products: [],
  searchQuery: '',
  sort: '',
  availableSorts: [],
  priceRange: { min: 0, max: 0 }, 
  availablePricesRanges: [{
    id: '',
    name: '',
    results: 0
  }]
};

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext debe usarse dentro de un ProductProvider');
  }
  return context;
};

export const ProductProvider: FC< {children: ReactNode} > = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'SET_AVAILABLE_SORTS':
      return { ...state, availableSorts: action.payload };
    case 'SET_AVAILABLE_PRICES_RANGES':
      return { ...state, availablePricesRanges: action.payload };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    default:
      return state;
  }
};