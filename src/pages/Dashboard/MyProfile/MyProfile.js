import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='container mx-auto'>
            <h1 className='mt-3'
                style={{ color: '#D4A977', fontWeight: '300', letterSpacing: '2px' }}>
                Name: {user?.displayName}
            </h1>
            <h4 className='mt-3 text-secondary'
                style={{ fontWeight: '400', letterSpacing: '2px' }}>
                Email: {user?.email}
            </h4>

        </div>
    );
};

export default MyProfile;