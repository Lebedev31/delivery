import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DataSubmit } from "./types";

export const apiFormSlice = createApi({
  reducerPath: "apiFormSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/form" }),
  endpoints: (builder) => ({
    createNewUser: builder.mutation<void, DataSubmit>({
      query: (newUser) => ({
        url: "/createUser",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useCreateNewUserMutation } = apiFormSlice;
