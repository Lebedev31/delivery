import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PersonalResponse, AvatarResponse, LoginAuthRedirect } from "./types";

export const apiPersonalAreaSlice = createApi({
  reducerPath: "apiPersonalArea",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/personal",
    credentials: "include",
  }),
  tagTypes: ['Personal'],
  endpoints: (builder) => ({
    authPersonal: builder.query<LoginAuthRedirect, void>({
      query: () => "/redirect",
    }),
    getPersonal: builder.query<PersonalResponse, void>({
      query: () => "/info",
      providesTags: ['Personal']
    }),
    updateAvatar: builder.mutation<AvatarResponse, FormData>({
      query: (formData) => ({
        url: "/avatar",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ['Personal']
    }),
  }),
});

export const { useGetPersonalQuery, useUpdateAvatarMutation,useLazyAuthPersonalQuery  } = apiPersonalAreaSlice;
