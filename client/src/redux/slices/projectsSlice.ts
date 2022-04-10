import { createSlice } from "@reduxjs/toolkit"
import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle"
import { projectInterface } from "lib/types/project"
import { projectsApi } from "redux/services/projects"

const initialState = {
  ownerProjects: [],
  collaboratorsProjects: [],
  error: "",
  shouldRefetch: true,
  successCreatingProject: false,
} as {
  ownerProjects: projectInterface[]
  collaboratorsProjects: projectInterface[]
  error: string
  shouldRefetch: boolean
  successCreatingProject: boolean
}

const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      projectsApi.endpoints.getAllProjects.matchFulfilled,
      (state, action) => {
        state.ownerProjects = action.payload.data.owner
        state.collaboratorsProjects = action.payload.data.collaborator
        state.error = ""
        state.shouldRefetch = false
      }
    )
    builder.addMatcher(
      projectsApi.endpoints.getAllProjects.matchRejected,
      (state, action) => {
        console.log(action)
        state = initialState
        state.error = `Error occurred`
      }
    )
    builder.addMatcher(
      projectsApi.endpoints.createProject.matchFulfilled,
      (state, action) => {
        state.shouldRefetch = true
        state.successCreatingProject = true
      }
    )
  },
})

export const { reset } = slice.actions

export default slice.reducer
