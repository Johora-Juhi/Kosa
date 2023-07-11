import React from 'react';

const PricingEach = (props) => {
    // console.log(props.user.address.street);
    const { name } = props.user;
    return (
        <div>
            <h1>{name}</h1>
        </div>
    );
};

export default PricingEach;