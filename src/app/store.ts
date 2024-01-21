import { configureStore } from '@reduxjs/toolkit'
import shopSlice from 'features/user/shopSlice'
import userSlice from 'features/user/userSlice'



export const store = configureStore({
  reducer: {
    user: userSlice,
    shop: shopSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch