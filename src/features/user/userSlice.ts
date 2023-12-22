import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import AuthService from 'api/services/AuthService'

// Define a type for the slice state
interface UserState {
  user: User | null,
  isAuth: boolean,
  isLoading: boolean
}
interface User {
  email: string,
  id: string,
  isActivated: boolean
}
// Define the initial state using that type
const initialState: UserState = {
    user: null,
    isAuth: false,
    isLoading: false
}

const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
        state.isAuth = action.payload
    },
    setUser: (state, action: PayloadAction<User | null>) => {
        state.user = action.payload
    },
    setLodaing: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  },
})

export const { setAuth, setUser, setLodaing } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.user.isAuth
export const selectUser = (state: RootState) => state.user.user
export const selectIsLoading = (state: RootState) => state.user.isLoading

export default userSlice.reducer