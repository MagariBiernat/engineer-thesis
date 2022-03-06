import { createSlice } from "@reduxjs/toolkit"
import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle"
import { projectInterface } from "lib/types/project"
import { projectsApi } from "redux/services/projects"

const initialState = {
  ownerProjects: [],
  collaboratorsProjects: [],
  error: undefined,
} as {
  ownerProjects: projectInterface[]
  collaboratorsProjects: projectInterface[]
  error?: string
}

const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      projectsApi.endpoints.getAllProjects.matchFulfilled,
      (state, action) => {
        state.ownerProjects = action.payload.data.owner
        state.collaboratorsProjects = action.payload.data.collaborator
        state.error = undefined
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
        const isPrivate = action.payload.project.isPersonal
        const project = action.payload.project
        state.ownerProjects = [project, ...state.ownerProjects]
      }
    )
  },
})

export default slice.reducer
