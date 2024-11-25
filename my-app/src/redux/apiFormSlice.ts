import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DataSubmit, Logout, LoginAuthRedirect } from "./types";

export const apiFormSlice = createApi({
  reducerPath: "apiFormSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/form",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createNewUser: builder.mutation<void, DataSubmit>({
      query: (newUser) => ({
        url: "/createUser",
        method: "POST",
        body: newUser,
      }),
    }),

    checkLogin: builder.mutation<LoginAuthRedirect, Logout>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateNewUserMutation, useCheckLoginMutation } = apiFormSlice;
