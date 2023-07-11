import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const SelectedProduct = () => {
    const { productId } = useParams();
    const [eachProduct, setEachProduct] = useState({});

    useEffect(() => {
        const url = `http://localhost:3000/product/${productId}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => setEachProduct(data));
    }, [])
    return (
        <div>
            <h2>{productId}</h2>
            <h3>{eachProduct.productName}</h3>
            <img src={eachProduct.img} alt="" />
        </div>
    );
};

export default SelectedProduct;