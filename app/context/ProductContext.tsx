import React, { createContext, useContext, useReducer, Dispatch, ReactNode } from 'react';
import { AppState, AppAction } from "../types/searchResponse"
import { productReducer } from './reducer';

interface ProductContextProps {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const initialState: AppState = {
  page: 1,
  paging: {
    total: 0,
    offset: 0,
    limit: 10,
  },
  products: [],
  searchQuery: undefined,
  sort: 'relevance',
  availableSorts: [{id: '', name: ''}],
  priceRange: { min: '', max: '' }, 
  availablePricesRanges: {
    id: '',
    name: '',
    values: []
  }
};

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
