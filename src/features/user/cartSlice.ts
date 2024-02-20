import { Dispatch, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IProduct, ProductParams } from "models/IProduct";

interface ICartProduct extends IProduct{
    count: number,
    totalPrice: number
}
export interface CartState {
    products: Array<ICartProduct>,
}
const initialState: CartState = {
    products: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<IProduct>) => {
            const newProduct = {
                ...action.payload,
                count: 1,
                totalPrice: parseInt(action.payload.price)
            };
            if(state.products.find((product) => product.id === newProduct.id)) {
                state.products.map((product) => {
                    if(product.id === newProduct.id) {
                        product.count += 1;
                        product.totalPrice += parseInt(newProduct.price)
                    }
                })
            } else {
                const newProducts = [newProduct, ...state.products];
                state.products = newProducts;
            }
        },
        incrementCount: (state, action: PayloadAction<string>) => {
            state.products.map((product) => {
                if(product.id === action.payload) {
                    product.count += 1;
                    const priceInt = parseInt(product.price)
                    product.totalPrice += priceInt;
                }
            })
        },
        discrementCount: (state, action: PayloadAction<string>) => {
            state.products.map((product) => {  // вертає новий масів 
                if(product.id === action.payload) {
                    if(product.count > 1) {
                        product.count -= 1;
                        const priceInt = parseInt(product.price)
                        product.totalPrice -= priceInt;
                    }
                }
            })
        },
        deleteCartProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((product) => product.id !== action.payload) // вертає отфільтрований масів без свойства яке ми передали
        }   
    }
})

export const selectCartProducts = (state: RootState) => state.cart.products;
export const {addProductToCart, incrementCount, discrementCount, deleteCartProduct} = cartSlice.actions;

export default cartSlice.reducer