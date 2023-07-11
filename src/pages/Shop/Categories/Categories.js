import React from 'react';
import './Categories.css';

const Categories = ({ category }) => {
    const { name } = category;
    return (
        <div className='categories'>
            <h2>{name}</h2>
        </div>
    );
};

export default Categories;