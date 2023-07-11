import React from 'react';
import './UpCommingProduct.css';

const UpCommingProduct = ({ upcommingProduct }) => {
    const { img, productName, price } = upcommingProduct;
    return (
        <div className='upcommingProduct'>
            <div className="upcommingProductContent">
                <div>
                    <img src={img} alt="" />
                </div>
                <div>
                    <h1>{productName}</h1>
                    <h1>£{price}</h1>
                </div>
            </div>
        </div>
    );
};

export default UpCommingProduct;