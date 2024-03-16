import { Dispatch, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IProduct, ProductParams } from "models/IProduct";

export interface ICartProduct extends IProduct {
    count: number | null,
    totalPriceOfProduct: number
}
export interface CartState {
    products: Array<ICartProduct>,
    totalPriceOfProducts: number,
    totalCount: number
}
const initialState: CartState = {
    products: [],
    totalPriceOfProducts: 0,
    totalCount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<IProduct>) => {
            const newProduct = {
                ...action.payload,
                count: 1,
                totalPriceOfProduct: parseInt(action.payload.price)
            };
            state.totalPriceOfProducts += parseInt(action.payload.price)
            state.totalCount += newProduct.count

            if (state.products.find((product) => product.id === newProduct.id)) {
                state.products.map((product) => {
                    if (product.id === newProduct.id && product.count !== null) {
                        product.count += 1;
                        product.totalPriceOfProduct += parseInt(newProduct.price)
                    }
                })
            } else {
                const newProducts = [newProduct, ...state.products];
                state.products = newProducts;
            }
        },
        incrementCount: (state, action: PayloadAction<string>) => {
            state.products.map((product) => {
                if (product.id === action.payload) {
                    if (product.count === null) {
                        product.count = 0;
                    }
                    product.count += 1;
                    const priceInt = parseInt(product.price)
                    product.totalPriceOfProduct += priceInt;

                    state.totalPriceOfProducts += priceInt
                    state.totalCount += 1
                }
            })
        },
        discrementCount: (state, action: PayloadAction<string>) => {
            state.products.map((product) => {
                if (product.id === action.payload && product.count !== null) {
                    if (product.count > 1) {
                        product.count -= 1;
                        const priceInt = parseInt(product.price)
                        product.totalPriceOfProduct -= priceInt;
                        state.totalPriceOfProducts -= priceInt
                        state.totalCount -= 1
                    }
                }
            })
        },
        changeCountOnInput: (state, action: PayloadAction<{ productId: string, newCount: string }>) => {
            state.products.map((product) => {
                if (product.id !== action.payload.productId) {
                    return;
                }

                const newCount = parseInt(action.payload.newCount);
                const priceInt = parseInt(product.price);

                if (!newCount) {
                    product.totalPriceOfProduct = priceInt;
                    product.count = null;
                    state.totalPriceOfProducts = state.products.reduce((acc, product) => acc + product.totalPriceOfProduct, 0)
                    state.totalCount = state.products.reduce((acc, product) => acc + (product.count === null ? 0 : product.count), 0)
                    return
                }

                product.count = newCount;

                if (product.count > 100000) {
                    product.totalPriceOfProduct = 100000 * priceInt;
                    product.count = 100000
                    state.totalPriceOfProducts = state.products.reduce((acc, product) => acc + product.totalPriceOfProduct, 0)
                    state.totalCount = state.products.reduce((acc, product) => acc + (product.count === null ? 0 : product.count), 0)
                    return
                }
                
                product.totalPriceOfProduct = newCount * priceInt;
                product.count = newCount
                state.totalPriceOfProducts = state.products.reduce((acc, product) => acc + product.totalPriceOfProduct, 0)
                state.totalCount = state.products.reduce((acc, product) => acc + (product.count === null ? 0 : product.count), 0)
            });
        },
        resetCountOnInput: (state) => {
            state.products.map((product) => {
                if (product.count === null) {
                    product.count = 1;
                    return product.count;
                }
            })
        },
        deleteCartProduct: (state, action: PayloadAction<string>) => {
            const product = state.products.find((product) => product.id === action.payload)
            state.totalPriceOfProducts -= product?.totalPriceOfProduct || 0
            state.totalCount -= product?.count || 0
            state.products = state.products.filter((product) => product.id !== action.payload) // вертає отфільтрований масів без свойства яке ми передали
        }
    }
})

export const selectCartProducts = (state: RootState) => state.cart.products;
export const selectCartTotalPriceOfProducts = (state: RootState) => state.cart.totalPriceOfProducts;
export const selectTotalCount = (state: RootState) => state.cart.totalCount;
export const { addProductToCart, incrementCount, discrementCount, changeCountOnInput, resetCountOnInput, deleteCartProduct } = cartSlice.actions;

export default cartSlice.reducer