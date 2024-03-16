import { Dispatch, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IProduct, ProductParams } from "models/IProduct";
import { useEffect } from "react";

export interface User {
    name: string,
    email: string,
    status: string,
    role: string,
    id: string
}

export interface TableState {
    users: User[]
}
const initialState: TableState = {
    users: []
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        addUserToUsers: (state, action: PayloadAction<User>) => {
            const newUsers = [action.payload, ...state.users]
            state.users = newUsers
        },
        deleteUserFromUsers: (state, action: PayloadAction<string>) => {
            const filteredUsers = state.users.filter((item) => item.id !== action.payload)
            state.users = filteredUsers
        },
        updateUserToUsers: (state, action: PayloadAction<User>) => {
            const updatedUsers = state.users.map(user => {
                if (user.id === action.payload.id) {
                    return action.payload;
                } else {
                    return user;
                }
            });
            state.users = updatedUsers
        },
        updateUserList: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload
        }  
    }
})

export const selectTableUsers = (state: RootState) => state.table.users;
export const { addUserToUsers, deleteUserFromUsers, updateUserToUsers, updateUserList } = tableSlice.actions;

export default tableSlice.reducer