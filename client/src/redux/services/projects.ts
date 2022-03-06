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
  baseUrl: BACKEND_URI + "/projects/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.user?.token
    console.log(token)
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
      query: () => "/",
    }),
    getProject: build.query<projectInterface, { id: string }>({
      query: ({ id }) => `/${id}`,
    }),
    createProject: build.mutation<
      createProjectResultType,
      { name: string; description: string; isPersonal: boolean }
    >({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
} = projectsApi
