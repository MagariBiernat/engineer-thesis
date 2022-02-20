import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { BACKEND_URI } from "lib/config"

export type User = {
  _id: string
  fullName: string
  profilePicture: string
  token: string
}

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URI + "/auth/",
})

export const authApi = createApi({
  baseQuery,
  reducerPath: "authApi",
  endpoints: (build) => ({
    login: build.mutation<User, { email: string; password: string }>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: build.mutation<
      User,
      {
        email: string
        password: string
        fullName: string
        password2: string
        gender: string
      }
    >({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
