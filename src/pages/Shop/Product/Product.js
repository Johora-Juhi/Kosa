import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/cart/cartSlice';
import './Product.css';


const Product = (props) => {
    const { img, leftName, rightName, productName, price } = props.product;
    const dispatch = useDispatch();

    useEffect(() => {

    }, [])
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className="productSpecificContainer">
                <div>{leftName}</div>
                <div className='roundC'></div>
                <div>{rightName}</div>
            </div>
            <h1>{productName}</h1>
            <h2>£{price}</h2>
            <button onClick={() => dispatch(addToCart(props.product))} >Add to Cart</button>
        </div>
    );

};

export default Product; 