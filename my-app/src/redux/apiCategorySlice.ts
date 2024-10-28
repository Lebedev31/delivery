import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryMenuResponseData } from "./types";

export const apiCategorySlice = createApi({
  reducerPath: "apiCategory",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/category" }),
  endpoints: (builder) => ({
    getAll: builder.query<CategoryMenuResponseData, string>({
      query: (id) => id,
    }),
  }),
});

export const { useGetAllQuery } = apiCategorySlice;
