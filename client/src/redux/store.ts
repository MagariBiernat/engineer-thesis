import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { persistStore } from "redux-persist"
import persistCombineReducers from "redux-persist/lib/persistCombineReducers"
import storage from "redux-persist/lib/storage"
import { authApi } from "./services/auth"
import auth from "./slices/authSlice"

const persistConfig = {
  key: "root",
  storage,
  blacklist: [authApi.reducerPath],
}

const reducers = persistCombineReducers(persistConfig, {
  [authApi.reducerPath]: authApi.reducer,
  auth,
})

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"]
) =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
    ...options,
  })

export const store = createStore()

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
