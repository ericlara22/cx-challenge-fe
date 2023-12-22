import React, { createContext, useContext, useReducer, Dispatch, ReactNode } from 'react';
import { AppState, AppAction } from "../types/searchResponse"
import { productReducer } from './reducer';

interface ProductContextProps {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const init: AppState = {
  page: 0,
  paging: {
    total: 0,
    offset: 0,
    limit: 10,
  },
  products: [],
  searchQuery: undefined,
  sort: 'Más relevantes',
  availableSorts: [{id: '', name: ''}],
  priceRange: { min: '', max: '' }, 
  availablePricesRanges: {
    id: '',
    name: '',
    values: []
  }
};

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode; initialState: AppState }> = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(productReducer, initialState || init);

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
