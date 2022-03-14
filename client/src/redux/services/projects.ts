import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"
import { BACKEND_URI } from "lib/config"
import { projectInterface } from "lib/types/project"

type useGetAllProjectsType = {
  data: {
    owner: projectInterface[]
    collaborator: projectInterface[]
  }
}

type createProjectResultType = {
  message: string
  project: projectInterface
}

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URI + "/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.user?.token
    if (token) {
      headers.set("authorization", token)
    }

    return headers
  },
})

export const projectsApi = createApi({
  baseQuery,
  reducerPath: "projectsApi",
  endpoints: (build) => ({
    getAllProjects: build.query<useGetAllProjectsType, void>({
      query: () => "/projects",
    }),
    getProject: build.query<projectInterface, { id: string }>({
      query: ({ id }) => `projects/${id}`,
    }),
    createProject: build.mutation<
      createProjectResultType,
      { name: string; description: string; isPersonal: boolean }
    >({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
    }),
    createNewColumnInProject: build.mutation<
      { message: string },
      { columnName: string; projectId: string }
    >({
      query: (data) => ({
        url: "/column",
        method: "POST",
        body: data,
      }),
    }),
    updateColumnName: build.mutation<
      { message: string },
      { columnId: string; projectId: string; columnName: string }
    >({
      query: (data) => ({
        url: "/column",
        method: "PUT",
        body: data,
      }),
    }),
    deleteColumn: build.mutation<
      { message: string },
      { columnId: string; projectId: string }
    >({
      query: (data) => ({
        url: "/column",
        method: "DELETE",
        body: data,
      }),
    }),
    inviteUserToProject: build.mutation<
      { message: string },
      { projectId: string; email: string }
    >({
      query: (body) => ({
        url: "/projects/invite",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const {
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useCreateNewColumnInProjectMutation,
  useDeleteColumnMutation,
  useUpdateColumnNameMutation,
  useInviteUserToProjectMutation,
} = projectsApi
