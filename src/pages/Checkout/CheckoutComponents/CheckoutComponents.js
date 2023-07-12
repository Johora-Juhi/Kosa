import React from 'react';
import { useEffect } from 'react';
import CheckoutBanner from '../CheckoutBanner/CheckoutBanner';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import useTitle from '../../../hooks/useTitle';

const CheckoutComponents = () => {
    useTitle('Checkout');

    useEffect(() => {
        window.scrollTo(0,0)
        }, [])

    return (
        <div>
            <CheckoutBanner></CheckoutBanner>
            <CheckoutForm></CheckoutForm>
        </div>
    );
};

export default CheckoutComponents;