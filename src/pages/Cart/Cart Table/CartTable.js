import React from 'react';
import { useDispatch } from 'react-redux';
// import { removeFromCart } from '../../../features/cart/cartSlice';
import { addToCartAsync, deleteFromCartAsync, removeFromCartAsync } from '../../../features/cart/cartApi';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const CartTable = ({ cartProduct, serial }) => {
    const { user } = useContext(AuthContext)

    const { productName, catagory, price, img, quantity } = cartProduct;
    const dispatch = useDispatch();

    return (
        <>
            <tr class="alert" role="alert">
                <td>
                    <div style={{ fontSize: "16px" }}>{serial + 1}</div>
                </td>
                <td>
                    <div class="img" >
                        <img className='w-100' src={img} alt="" />
                    </div>
                </td>
                <td>
                    <div class="name">
                        <span>{productName} </span>
                        <span>{catagory.charAt(0).toUpperCase()}{catagory.slice(1)}</span>
                    </div>
                </td>
                <td>£{price}</td>
                <td class="quantity px-0">
                    <div class="input-group border" >
                        <button onClick={() => dispatch(addToCartAsync({ product: cartProduct, userEmail: user?.email }))} className='btn btn-outline-0'>+</button>
                        <input type="text" name="quantity" class="quantity p-0 text-center form-control border-0 input-number" value={quantity} min="1" max="100" />
                        <button onClick={() => dispatch(removeFromCartAsync({ product: cartProduct, userEmail: user?.email }))} className='btn btn-outline-0'>-</button>
                    </div>
                </td>
                <td>£{(price * quantity).toFixed(2)}</td>
                <td>
                    <button
                        data-bs-toggle="modal" data-bs-target="#exampleModal"

                        // onClick={() => dispatch(removeFromCart(cartProduct))}
                        type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true"><i class="fa fa-close"></i></span>
                    </button>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered ">
                            <div class="modal-content p-2">
                                <div class="modal-header border-0">
                                    <p class="" style={{ fontSize: "1.125rem", lineHeight: "1.75rem", fontWeight: "700", letterSpacing: "0px", marginBottom: "0", color: "rgb(51, 51, 51)" }} id="exampleModalLabel">Are you sure you want to delete!</p>
                                    <button type="button" class="btn-xs btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="" style={{ fontSize: "16px", lineHeight: "1.75rem", fontWeight: "500", letterSpacing: "0px", paddingLeft: "16px", paddingBottom: "32px", color: "rgb(51, 51, 51)" }}>
                                    If you delete {productName} from cart items it can not be undone!
                                </div>
                                <div class="modal-footer border-0">
                                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => dispatch(deleteFromCartAsync({ product: cartProduct, userEmail: user?.email }))}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default CartTable;