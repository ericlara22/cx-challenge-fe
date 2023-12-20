import { createContext, useContext, FC, ReactNode, Dispatch, SetStateAction, useState } from 'react';

interface Product {
  id: string;
  title: string;
  price: {
      currency: string;
      amount: string;
      decimals: number;
  };
  installments: {
      quantity: number;
      amount: string;
  };
  address: {
      state_name: string;
      city_name: string;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
}

interface ProductContextProps {
  products: Product[];
  updateProducts: Dispatch<SetStateAction<Product[] | ((prevProducts: Product[]) => Product[])>>;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext debe usarse dentro de un ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
  initialProducts?: Product[];
}

export const ProductProvider: FC<ProductProviderProps> = ({ children, initialProducts = []  }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProducts = (newProducts: any) => {
    setProducts(newProducts);
  };

  return (
    <ProductContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductContext.Provider>
  );
};