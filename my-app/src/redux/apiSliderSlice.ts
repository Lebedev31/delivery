import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SliderResponseData } from "./types";

export const apiSliderSlice = createApi({
  reducerPath: "apiSlider",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/apiSlider" }),
  endpoints: (builder) => ({
    getAll: builder.query<SliderResponseData, void>({
      query: () => "/getAll",
    }),
    createSlide: builder.mutation<string, FormData>({
      query: (data) => ({
        url: "/createSlide",
        method: "POST",
        body: data,
      }),
    }),

    updateSlide: builder.mutation<string, FormData>({
      query: (data) => ({
        url: "/updateSlide",
        method: "PATCH",
        body: data,
      }),
    }),

    deleteSlide: builder.mutation<string, string>({
      query: (id) => ({
        url: `/deleteSlide${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllQuery,
  useCreateSlideMutation,
  useUpdateSlideMutation,
  useDeleteSlideMutation,
} = apiSliderSlice;
