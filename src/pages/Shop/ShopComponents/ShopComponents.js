import React, { useEffect } from 'react';
import Products from '../Products/Products';
import ShopBanner from '../ShopBanner/ShopBanner';
import useTitle from '../../../hooks/useTitle';

const ShopComponents = () => {
    useTitle('Shop');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div>
            <ShopBanner></ShopBanner>
            <Products></Products>
        </div>
    );
};

export default ShopComponents;