import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SliderResponseData } from "./types";

export const apiSliderSlice = createApi({
  reducerPath: "apiSlider",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/apiSlider" }),
  endpoints: (builder) => ({
    getAll: builder.query<SliderResponseData, void>({
      query: () => "/getAll",
    }),
  }),
});

export const { useGetAllQuery } = apiSliderSlice;
