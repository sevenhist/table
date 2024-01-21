import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "api/services/AuthService";
import ShopService from "api/services/ShopService";
import { RootState } from "app/store";
import { AxiosError } from "axios";
import { ICategory } from "models/ICategory";
import { IProduct } from "models/IProduct";
import { toast } from "react-toastify";

export const fetchCategories = createAsyncThunk(
    'shop/fetchCategories',
    async (_, {rejectWithValue}) => {
        try {
            const response = await ShopService.getCategories();
            return response.data;
        } catch(err: unknown) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data?.message || 'error get categories');
            } else {
                throw err;
            }
        }
    }
)

export const fetchOneCategory = createAsyncThunk(
    'shop/fetchOneCategory',
    async (categoryId: string, {rejectWithValue}) => {
        try {
            const response = await ShopService.getOneCategory(categoryId);
            return response.data;
        } catch(err: unknown) {
            if(err instanceof AxiosError) {
                return rejectWithValue(err.response?.data?.message || 'error get category')
            } else {
                throw err;
            }
        }
    }
)

export const fetchProducts = createAsyncThunk(
    'shop/fetchProducts',
    async (categoryId: string, {rejectWithValue}) => {
        try {
            const response = await ShopService.getProducts(categoryId);
            return response.data;
        } catch(err: unknown) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data?.message || 'error get products');
            } else {
                throw err;
            }
        }
    }
)

interface ShopState {
    products: Array<IProduct>,
    categories: Array<ICategory>,
    category: ICategory | null
}
const initialState: ShopState = {
    products: [],
    categories: [],
    category: null
}
const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Array<ICategory>>) => {
            state.categories = action.payload
        })
        builder.addCase(fetchCategories.rejected, (state, action: PayloadAction<any>) => {
            const errorMessage = action.payload 
            toast(errorMessage, {
                type: "error"
            })
        })
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Array<IProduct>>) => {
            state.products = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
            const errorMessage = action.payload 
            toast(errorMessage, {
                type: "error"
            })
        })
        builder.addCase(fetchOneCategory.fulfilled, (state, action: PayloadAction<ICategory>) => {
            state.category = action.payload
        })
        builder.addCase(fetchOneCategory.rejected, (state, action: PayloadAction<any>) => {
            const errorMessage = action.payload
            toast(errorMessage, {
                type: "error"
            })
        })
    }
})
export const selectCategories = (state: RootState) => state.shop.categories
export const selectOneCategory = (state: RootState) => state.shop.category
export const selectProducts = (state: RootState) => state.shop.products

export default shopSlice.reducer