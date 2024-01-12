import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, Comment } from '../types/product';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Comments'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://iim.etherial.fr/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
    getProductComments: builder.query<Comment[], string | number>({
      query: (id) => `products/${id}/comments`,
      providesTags: (result, error, id) => [{ type: 'Comments', id }]
    }),
    createComment: builder.mutation<Comment & { id: string | number }, Comment & { id: string | number }>({
      query: ({ id, ...body }) => ({
        url: `products/${id}/comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Comments', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductCommentsQuery, useCreateCommentMutation } = api;