import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../..'

export interface AuthState {
  accessToken: string
  username: string
}

const initialState: AuthState = {
  accessToken: '',
  username: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken += action.payload
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    clearAuth(state) {
      state.accessToken = ''
      state.username = ''
    },
  },
})

export const { setAccessToken, setUsername, clearAuth } = authSlice.actions

export const selectAccessToken = (state: AppState) => state.auth.accessToken

export default authSlice.reducer
