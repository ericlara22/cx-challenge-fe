import { Product } from './product';

export interface AppState {
  page: number;
  paging: {total: number, offset: number, limit: number},
  products: Product[];
  searchQuery: string | undefined;
  sort: string;
  availableSorts: [{ id: string; name: string }];
  priceRange: { min: string, max: string },
  availablePricesRanges: {
    id: string,
    name: string,
    values: []
  }
}

export type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'SET_AVAILABLE_SORTS'; payload: AppState['availableSorts'] }
  | { type: 'SET_AVAILABLE_PRICES_RANGES'; payload: AppState['availablePricesRanges'] }
  | { type: 'SET_PRICE_RANGE'; payload: AppState['priceRange'] }
  | { type: 'SET_PAGING'; payload: AppState['paging'] }
  | { type: 'SET_PAGE'; payload: number };

export interface SearchResponse {
  'site_id': string,
  'country_default_time_zone': 'GMT-03:00',
  'query': string,
  'paging': {},
  'results': Product[],
  'sort': { id: string; name: string },
  'available_sorts': AppState['availableSorts'],
  'filters': [
    {
      'id': string,
      'name': string,
      'type': string,
      'values': [
        {
          'id': string,
          'name': string
        }
      ]
    }
  ],
  'available_filters': [
    {
      'id': string,
      'name': string,
      'type': string,
      'values': [
        {
          'id': string,
          'name': string,
          'results': number
        }
      ]
    }
  ],
  'pads_info': {}
}