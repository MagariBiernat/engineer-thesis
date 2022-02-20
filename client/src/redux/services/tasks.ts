import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"
import { BACKEND_URI } from "lib/config"

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URI,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.user?.token
    if (token) {
      headers.set("authentication", token)
    }
    return headers
  },
})

export const taskApi = createApi({
  reducerPath: "tasks",
  baseQuery,
  // tagTypes: "Tasks",
  endpoints: (build) => ({
    // addTask: build.mutation<>({
    // 	query: ()
    // })
  }),
})
