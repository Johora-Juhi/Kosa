
import { createSlice } from "@reduxjs/toolkit"
import toast from 'react-hot-toast';
const notify = () => toast.success('Added to cart');

const initialState = {
    cart: []
}

const CartSlice = createSlice({

    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const selectedProduct = state.cart.find(product => product._id === action.payload._id);
            if (!selectedProduct) {
                const product = { ...action.payload, quantity: 1 };
                state.cart.push(product);
                notify();
            }
            else {
                selectedProduct.quantity += 1;
                state.cart
                    .filter((product) => product._id !== selectedProduct._id)
                    .push(selectedProduct);
                notify();
            }
        },
        removeFromCart: (state, action) => {
            if (action.payload.quantity > 1) {
                const product = {
                    ...action.payload,
                    quantity: action.payload.quantity - 1
                }
                state.cart = state.cart.filter(product => product._id !== action.payload._id)
                state.cart.push(product);
            }
            else {
                state.cart = state.cart.filter(product => product._id !== action.payload._id)
            }
        }
    }
})

export const { addToCart, removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;