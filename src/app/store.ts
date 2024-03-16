import { configureStore } from '@reduxjs/toolkit'
import cartSlice from 'features/user/cartSlice'
import shopSlice from 'features/user/shopSlice'
import tableSlice from 'features/user/tableSlice'
import userSlice from 'features/user/userSlice'



export const store = configureStore({
  reducer: {
    user: userSlice,
    shop: shopSlice,
    cart: cartSlice,
    table: tableSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch