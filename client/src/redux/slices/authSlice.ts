import { createSlice } from "@reduxjs/toolkit"
import { User, authApi } from "redux/services/auth"
// import {use}
import { RootState } from "redux/store"

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
} as {
  user: null | User
  isAuthenticated: boolean
  error: null | string
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      }
    )
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, action) => {
        // Error 400 -> Wrong credentials
        if (action.payload?.status === 400) state.error = "Wrong credentials"
      }
    )
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      }
    )
    builder.addMatcher(
      authApi.endpoints.register.matchRejected,
      (state, action) => {
        // Error 400 -> Validations went wrong
        // Error 401 -> Email is taken
        if (action.payload?.status === 400) state.error = "Wrong credentials"
        if (action.payload?.status === 401) state.error = "Email is taken"
      }
    )
  },
})

export const { logout } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
