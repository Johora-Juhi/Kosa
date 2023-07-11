import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartTable from '../Cart Table/CartTable';
import './CartDetails.css';

const CartDetails = () => {

    const cart = useSelector(state => state.cart);
    const cartDetails = cart.cart;
    const cartLength = (cart.cart.length);


    const eachProductCost = (cartDetails.map(c => (c.price * c.quantity)));
    const subTotal = (eachProductCost.reduceRight((acc, cur) => acc + cur, 0)).toFixed(2);

    return (
        <div className='cartDetails'>{cartLength ?
            <div className='container mx-auto py-5'>
                <div class="table-wrap">
                    <table class="table">
                        <thead class="thead-primary">
                            <tr>
                                <th className='bg-dark'>&nbsp;</th>
                                <th className='bg-dark'>Product</th>
                                <th className='bg-dark'>Name</th>
                                <th className='bg-dark'>Price</th>
                                <th className='bg-dark'>Quantity</th>
                                <th className='bg-dark'>Total</th>
                                <th className='bg-dark'>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartDetails &&
                                cartDetails.map((cartProduct, i) => <CartTable
                                    serial={i}
                                    key={cartProduct._id}
                                    cartProduct={cartProduct}
                                ></CartTable>)
                            }
                        </tbody>
                    </table>
                </div>
                <div style={{ width: "320px" }} className='bg-dark py-3 text-center border border-white' >
                    <Link to="/shop" className='py-2 px-2' style={{ color: "#fff", textDecoration: "none", letterSpacing: '1px' }} >Want to add more items !</Link>
                </div>
                <div>
                    <h3 className='mt-5'>Cart Totals</h3>
                    <div className='d-flex justify-content-between border-top border-bottom px-2'>
                        <div style={{ fontSize: "17px" }} className='mb-0 py-3'>Subtotal</div>
                        <div style={{ fontSize: "17px" }} className='mb-0 py-3'>£{subTotal}</div>
                    </div>
                    <div className='d-flex justify-content-between  align-items-center border-bottom px-2 py-3'>
                        <div style={{ fontSize: "17px" }} className='mb-0 py-3'>Shipping</div>
                        <div className='d-flex flex-column text-right' style={{ fontSize: "17px" }}>
                            <div className='py-2'>Free Shipping</div>
                            <div className='py-2'>Shipping options will be updated during checkout.</div>
                            <div className='py-2'>Calculate shipping</div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between border-bottom px-2'>
                        <div style={{ fontSize: "17px" }} className='mb-0 py-3'>Total</div>
                        <div style={{ fontSize: "17px", color: 'black' }} className='mb-0 py-3 fw-bold'>£{subTotal}</div>
                    </div>
                </div>
                <div style={{ width: "320px", margin: "auto" }} className='bg-dark py-3 text-center  border border-white mt-5' >
                    <Link to="/checkout" className='py-2 px-2 text-center' style={{ color: "#fff", textDecoration: "none", letterSpacing: '1px' }} >Proceed to Checkout</Link>
                </div>
            </div> :
            <div className='py-5 text-center'>
                <h2 className='text-center mb-4'> Cart is empty.</h2>
                <Link to="/Shop" className='py-3 px-4 text-center' style={{ color: "#fff", backgroundColor: "black", textDecoration: "none", letterSpacing: '1px' }} >Go to Shop</Link>
            </div>
        }

        </div>
    );
};

export default CartDetails;