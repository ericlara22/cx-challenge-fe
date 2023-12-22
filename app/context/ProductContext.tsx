import React, { createContext, useContext, useReducer, Dispatch, ReactNode } from 'react';
import { Product } from "../types/product"
import { AppState } from "../types/searchResponse"

type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_PRICE_RANGE'; payload: { min: number; max: number } }
  | { type: 'SET_SORT'; payload: string };

interface ProductContextProps {
  state: AppState;
  dispatch: Dispatch<Action>;
}

const init: AppState = {
  paging: {
    total: 0,
    offset: 0,
    limit: 0,
  },
  products: [],
  searchQuery: '',
  sort: '',
  availableSorts: [],
  priceRange: { min: 0, max: 0 }, 
  availablePricesRanges: {
    id: '',
    name: '',
    values: []
  }
};

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

const productReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    default:
      return state;
  }
};

export const ProductProvider: React.FC<{ children: ReactNode; initialState: AppState }> = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
