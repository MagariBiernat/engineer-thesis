import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"
import { BACKEND_URI } from "lib/config"
import { taskInterface } from "lib/types/project"

type createTaskResult = {
  message: string
  task: taskInterface
}

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URI + "/tasks/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.user?.token
    if (token) {
      headers.set("authorization", token)
    }

    return headers
  },
})

export const currentProjectApi = createApi({
  baseQuery,
  reducerPath: "currentProjectsApi",
  endpoints: (build) => ({
    getTask: build.query<taskInterface, { projectId: string; taskId: string }>({
      query: ({ projectId, taskId }) => ({
        url: `${projectId}/${taskId}`,
        method: "GET",
      }),
    }),
    createTask: build.mutation<
      createTaskResult,
      {
        title: string
        columnId: string
        description: string
        priority: string
        projectId: string
      }
    >({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
    moveTask: build.mutation<
      { message: string },
      {
        sourceColumnId: string
        sourceIndex: number
        destinationIndex: number
        destinationColumnId?: string
        projectId: string
        taskId: string
      }
    >({
      query: (body) => ({
        url: "reorderTask",
        method: "POST",
        body,
      }),
    }),
    reorderColumn: build.mutation<
      { message: string },
      {
        columnId: string
        sourceIndex: number
        destinationIndex: number
        projectId: string
      }
    >({
      query: (body) => ({
        url: "reorderColumns",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const {
  useGetTaskQuery,
  useCreateTaskMutation,
  useMoveTaskMutation,
  useReorderColumnMutation,
} = currentProjectApi
