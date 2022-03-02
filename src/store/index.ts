import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from './modules/counter/counterSlice'
import bookshelfReducer from './modules/bookshelf/bookshelfSlice'
import authReducer from './modules/auth/authSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      bookshelf: bookshelfReducer,
      counter: counterReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
