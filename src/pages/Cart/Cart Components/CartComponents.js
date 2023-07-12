import React, { useEffect } from 'react';
import CartBanner from '../Cart Banner/CartBanner';
import CartDetails from '../CartDetails/CartDetails';
import useTitle from '../../../hooks/useTitle';

const CartComponents = () => {
    useTitle('Cart');

    useEffect(() => {
        window.scrollTo(0,0)
        }, [])
        
    return (
        <div>
            <CartBanner></CartBanner>
            <CartDetails></CartDetails>
        </div>
    );
};

export default CartComponents;