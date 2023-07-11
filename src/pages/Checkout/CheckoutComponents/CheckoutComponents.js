import React from 'react';
import { useEffect } from 'react';
import CheckoutBanner from '../CheckoutBanner/CheckoutBanner';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const CheckoutComponents = () => {
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