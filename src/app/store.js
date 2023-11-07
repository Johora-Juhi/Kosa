import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productApi } from "../features/api/productSlice";
import cartSlice from "../features/cart/cartSlice";
import cartApi from "../features/cart/cartApi";

const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        cart: cartSlice,
        cartItem: cartApi
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productApi.middleware)
})

export default store;