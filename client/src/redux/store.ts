import {
  configureStore,
  ConfigureStoreOptions,
  current,
} from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { persistStore } from "redux-persist"
import persistCombineReducers from "redux-persist/lib/persistCombineReducers"
import storage from "redux-persist/lib/storage"
import { authApi } from "./services/auth"
import { projectsApi } from "./services/projects"
import { currentProjectApi } from "./services/currentProject"
import auth from "./slices/authSlice"
import projects from "./slices/projectsSlice"
import currentProject from "./slices/currentProject"
import { commentsApi } from "./services/comments"

const persistConfig = {
  key: "engineerThesisRoot",
  storage,
  blacklist: [authApi.reducerPath, projectsApi.reducerPath],
  whitelist: ["auth"],
}

const reducers = persistCombineReducers(persistConfig, {
  [authApi.reducerPath]: authApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [currentProjectApi.reducerPath]: currentProjectApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  projects,
  currentProject,
  auth,
})

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"]
) =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(projectsApi.middleware)
        .concat(currentProjectApi.middleware)
        .concat(commentsApi.middleware),
    ...options,
  })

export const store = createStore()

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
