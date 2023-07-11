import React from 'react';
import './ShopCart.css';

const ShopCart = ({ cart }) => {
    const { img, productName, price, quantity } = cart;
    return (
        <div className='shopCart'>
            <div className="shopCartContent">
                <div>
                    <img src={img} alt="" />
                </div>
                <div>
                    <h1>{productName}</h1>
                    <h1>{quantity} * £{price}</h1>
                </div>
            </div>
        </div>
    );
};

export default ShopCart;