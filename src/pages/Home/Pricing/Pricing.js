import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PricingEach from '../PricingEach/PricingEach';

const Pricing = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);
    console.log(users);
    return (
        <div>
            <h1>Pricing</h1>
            {
                users.map(user => <PricingEach
                    key={user.id}
                    user={user}
                >
                </PricingEach>)
            }
        </div>
    );
};

export default Pricing;