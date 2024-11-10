import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiRegisterSocialSlice = createApi({
  reducerPath: "apiRegisterSocialSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/auth" }),
  endpoints: (builder) => ({
    registerSocaialGoogle: builder.query<void, void>({
      query: () => "/google",
    }),
  }),
});

export const { useLazyRegisterSocaialGoogleQuery } = apiRegisterSocialSlice;
