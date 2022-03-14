import { createSlice, current } from "@reduxjs/toolkit"
import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle"
import { projectInterface } from "lib/types/project"
import { currentProjectApi } from "redux/services/currentProject"
import { projectsApi } from "redux/services/projects"

const initialState = {
  project: {},
  error: "",
  successCreatingTask: false,
  shouldRefetch: false,
} as {
  project: projectInterface
  isLoading: boolean
  error: string
  successCreatingTask: boolean
  shouldRefetch: boolean
}

const slice = createSlice({
  name: "currentProject",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      projectsApi.endpoints.getProject.matchFulfilled,
      (state, action) => {
        state.project = action.payload
        state.shouldRefetch = false
        state.successCreatingTask = false
        state.error = ""
      }
    )
    builder.addMatcher(
      projectsApi.endpoints.getProject.matchRejected,
      (state, action) => {
        state.error = "Error occurred"
        state.shouldRefetch = false
      }
    )
    builder.addMatcher(
      currentProjectApi.endpoints.createTask.matchFulfilled,
      (state, action) => {
        state.successCreatingTask = true
        state.shouldRefetch = true
      }
    )
    builder.addMatcher(
      currentProjectApi.endpoints.createTask.matchRejected,
      (state, action) => {
        console.log(action.payload, action.error)
      }
    )
    builder.addMatcher(
      projectsApi.endpoints.createNewColumnInProject.matchFulfilled,
      (state) => {
        state.shouldRefetch = true
      }
    )
    builder.addMatcher(
      projectsApi.endpoints.updateColumnName.matchFulfilled,
      (state) => {
        state.shouldRefetch = true
      }
    )
    builder.addMatcher(
      projectsApi.endpoints.updateColumnName.matchFulfilled,
      (state) => {
        state.shouldRefetch = true
      }
    )
    builder.addMatcher(
      projectsApi.endpoints.deleteColumn.matchFulfilled,
      (state) => {
        state.shouldRefetch = true
      }
    )
    builder.addMatcher(
      currentProjectApi.endpoints.moveTask.matchFulfilled,
      (state) => {
        state.shouldRefetch = true
      }
    )
    builder.addMatcher(
      currentProjectApi.endpoints.moveTask.matchRejected,
      (state, action) => {
        state.error = "Error occurred"
      }
    )

    builder.addMatcher(
      currentProjectApi.endpoints.reorderColumn.matchFulfilled,
      (state) => {
        state.shouldRefetch = true
      }
    )
  },
})

export const { reset } = slice.actions

export default slice.reducer
