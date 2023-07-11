import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../features/cart/cartSlice';

const CartTable = ({ cartProduct, serial }) => {

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
                <td class="quantity">
                    <div class="input-group" >
                        <input type="text" name="quantity" class="quantity form-control input-number" value={quantity} min="1" max="100" />
                    </div>
                </td>
                <td>£{(price * quantity).toFixed(2)}</td>
                <td>
                    <button onClick={() => dispatch(removeFromCart(cartProduct))} type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true"><i class="fa fa-close"></i></span>
                    </button>
                </td>
            </tr>
        </>
    );
};

export default CartTable;