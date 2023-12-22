export interface Product {
    id: string;
    title: string;
    price: number,
    installments?: {
      quantity: number;
      amount: number;
    };
    address: {
      state_name?: string;
      city_name?: string;
    };
    picture?: string; 
    condition: string;
    free_shipping?: boolean;
    thumbnail: string;
    shipping: {
      logistic_type: string;
    },
    currency_id: string;
  }