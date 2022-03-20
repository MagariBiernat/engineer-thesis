import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"
import { BACKEND_URI } from "lib/config"
import { taskInterface } from "lib/types/project"

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URI + "/comments/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.user?.token
    if (token) {
      headers.set("authorization", token)
    }

    return headers
  },
})

export const commentsApi = createApi({
  baseQuery,
  reducerPath: "commentsApi",
  endpoints: (build) => ({
    addComment: build.mutation<
      { message: string },
      { content: string; taskId: string }
    >({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
    deleteComment: build.mutation<
      { message: string },
      { commentId: string; taskId: string }
    >({
      query: (body) => ({
        url: "/",
        method: "DELETE",
        body,
      }),
    }),
  }),
})

export const { useAddCommentMutation, useDeleteCommentMutation } = commentsApi
