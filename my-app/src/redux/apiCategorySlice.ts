import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryMenuResponseData } from "./types";

export const apiCategorySlice = createApi({
  reducerPath: "apiCategory",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/category" }),
  endpoints: (builder) => ({
    getAll: builder.query<CategoryMenuResponseData, string>({
      query: (id) => id,
    }),

    getAllSearchNameFood: builder.query<CategoryMenuResponseData, string>({
      query: (id) => `/getAllSearchName${id}`,
    }),
  }),
});

export const { useGetAllQuery, useLazyGetAllSearchNameFoodQuery } = apiCategorySlice;
