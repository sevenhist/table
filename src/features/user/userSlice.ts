import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { IUser } from 'models/IUser'

// Define a type for the slice state
interface UserState {
  user: IUser | null,
  isAuth: boolean,
}

// Define the initial state using that type
const initialState: UserState = {
    user: null,
    isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
        state.isAuth = action.payload
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
        state.user = action.payload
    },
  },
})

export const { setAuth, setUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.user.isAuth
export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer