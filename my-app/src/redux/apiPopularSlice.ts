import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PopularFoodResponseData } from "./types";

export const apiPopularFoodSlice = createApi({
  reducerPath: "apiPopularFood",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/popular" }),
  endpoints: (builder) => ({
    getAll: builder.query<PopularFoodResponseData, void>({
      query: () => "/getAll",
    }),
  }),
});

export const { useGetAllQuery } = apiPopularFoodSlice;
