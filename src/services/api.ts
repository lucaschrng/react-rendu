import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Product = {
  id: string
  title: string,
  date: string,
  image: string,
  price: string,
  quantity: string,
  unit_of_measurement: string,
  measure: string,
  price_per_measure: string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://iim.etherial.fr/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
  }),
});

export const { useGetProductsQuery } = api;