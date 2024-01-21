import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { IUser } from 'models/IUser'
import AuthService from 'api/services/AuthService'
import { AuthResponse } from 'models/response/AuthResponse'
import { toast } from "react-toastify";
import { AxiosError } from 'axios'
import { ICategory } from 'models/ICategory'

interface AuthInput {
  email: string,
  password: string
}

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async (userData: AuthInput, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      const response = await AuthService.login(email, password);
      return response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response?.data?.message || 'server error');
      } else {
        throw err;
      }
    }
  }
);

export const fetchRegistration = createAsyncThunk(
  'user/fetchRegistration',
  async (userData: AuthInput, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      const response = await AuthService.registration(email, password);
      return response.data;
    } catch (err: unknown) {
      if(err instanceof AxiosError) {
        return rejectWithValue(err.response?.data?.message || 'server error');
      } else {
        throw err;
      }
    }
  }
)

export const fetchLogout = createAsyncThunk(
  'user/fetchLogout',
  async () => {
      const response = await AuthService.logout();
      return response;
  }
)


interface UserState {
  user: IUser | null,
  isAuth: boolean
}

const initialState: UserState = {
  user: null,
  isAuth: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      localStorage.setItem('token', action.payload.accessToken)
      state.isAuth = true
      state.user = action.payload.user
      toast("Success Login", {
        type: "success"
      });
    })
    builder.addCase(fetchLogin.rejected, (state, action: PayloadAction<any>) => {
      const errorMessage = action.payload
      toast(errorMessage, {
        type: "error"
      });
    })
    builder.addCase(fetchRegistration.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      localStorage.setItem('token', action.payload.accessToken)
      state.isAuth = true
      state.user = action.payload.user
      toast("Success Login", {
        type: "success"
      });
    })
    builder.addCase(fetchRegistration.rejected, (state, action: PayloadAction<any>) => {
      const errorMessage = action.payload
      toast (errorMessage, {
        type: "error"
      })
    })
    builder.addCase(fetchLogout.fulfilled, (state, action: PayloadAction<any>) => {
      state.isAuth = false;
    })
  },
})

export const { setAuth, setUser } = userSlice.actions
export const selectAuth = (state: RootState) => state.user.isAuth
export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer