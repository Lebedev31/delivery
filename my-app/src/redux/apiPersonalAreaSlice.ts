import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginAuthRedirect } from "./types";
import { ResponseUser } from "./types";

export const apiPersonalAreaSlice = createApi({
  reducerPath: "apiPersonalArea",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/personal",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    authPersonal: builder.query<LoginAuthRedirect, void>({
      query: () => "/redirect",
    }),

    getPersonal: builder.query<ResponseUser, void>({
      query: () => "/info",
    }),
  }),
});

export const { useLazyAuthPersonalQuery, useGetPersonalQuery } =
  apiPersonalAreaSlice;
