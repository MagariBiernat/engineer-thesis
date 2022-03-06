import { createSlice } from "@reduxjs/toolkit"
import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle"
import { projectInterface } from "lib/types/project"
import { projectsApi } from "redux/services/projects"

const initialState = {} as projectInterface

const slice = createSlice({
  name: "currentProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default slice.reducer
