import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const initialState = {
    cartItem: [],
    isLoading: false,
    postSuccess: false,
    deleteSuccess: false,
    isError: false,
    error: "",
};
export const getcartItem = createAsyncThunk(
    "cartItem/getCartItem",
    async (userEmail) => {
        const res = await fetch(`http://localhost:5000/cart?email=${userEmail}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            }
        });

        const data = await res.json()
        console.log(data);
        return data;
    }
);
export const addToCartAsync = createAsyncThunk('cartItem/addToCart', async ({ product, userEmail }, { dispatch, getState }) => {
    const state = getState();

    const selectedProduct = state.cartItem.cartItem.find(item => item._id === product._id);

    if (!selectedProduct) {
        // If the product is not in the cart, add it with quantity 1
        const productWithQuantity = { ...product, quantity: 1, email: userEmail, };

        try {
            // Make API call to add the product to the cart on the server
            const response = await fetch(`http://localhost:5000/cart?email=${userEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productWithQuantity }),
            });

            if (response.ok) {
                await dispatch(getcartItem(userEmail));
                toast.success('Product added to the cart successfully!');
            } else {
                toast.error('Error adding product to the cart:', response.status);
            }
        } catch (error) {
            toast.error('Error adding product to the cart:', error);
        }
    } else {
        // If the product is already in the cart, update its quantity locally
        const quantity = selectedProduct.quantity + 1;

        try {
            // Make API call to update the product quantity in the cart on the server
            const response = await fetch(`http://localhost:5000/cart/${selectedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { quantity: quantity } ),
            });

            if (response.ok) {
                await dispatch(getcartItem(userEmail));
                toast.success('Product quantity updated successfully!');
            } else {
                toast.error('Error updating product quantity in the cart:', response.status);
            }
        } catch (error) {
            toast.error('Error updating product quantity in the cart:', error);
        }
    }
});

const CartApi = createSlice({
    name: "cartItem",
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false;
        },
        //   toggleDeleteSuccess: (state) => {
        //     state.deleteSuccess = false;
        //   },
        //   removefromList: (state, action) => {
        //     state.Cart = state.Cart.filter(
        //       (Cart) => Cart._id !== action.payload
        //     );
        //   },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getcartItem.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getcartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItem = action.payload;
                state.isError = false;
            })
            .addCase(getcartItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(addToCartAsync.pending, (state) => {
                state.isLoading = true;
                state.postSuccess = false;
                state.isError = false;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.postSuccess = true;
                state.isError = false;
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.postSuccess = false;
                state.error = action.error.message;
            })
        // .addCase(removeCart.pending, (state) => {
        //   state.isLoading = true;
        //   state.deleteSuccess = false;
        //   state.isError = false;
        // })
        // .addCase(removeCart.fulfilled, (state, action) => {
        //   state.isLoading = false;
        //   state.deleteSuccess = true;
        //   state.isError = false;
        // })
        // .addCase(removeCart.rejected, (state, action) => {
        //   state.isLoading = false;
        //   state.isError = true;
        //   state.deleteSuccess = false;
        //   state.error = action.error.message;
        // });
    },
});
export default CartApi.reducer;