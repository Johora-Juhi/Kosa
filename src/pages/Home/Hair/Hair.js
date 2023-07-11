import React from 'react';
import { NavLink } from 'react-router-dom';
import './Hair.css';

const Hair = () => {
    return (
        <div className='hair'>
            <div className="row m-0">
                <div className="hairContent hairContent1 text-center col-lg-3 col-md-6 col-sm-12">
                    <h1 className=''>H</h1>
                    <h3 className=''>HAIR & COLOR ART</h3>
                    <p className=''>We are happy to be offering our full range of services in the salon, wash and blow drys include.</p>
                    <NavLink to="/commingSoon"><button className=''>View More</button></NavLink>
                </div>
                <div className="hairContent hairContent2 text-center col-lg-3 col-md-6 col-sm-12">
                    <h1 className=''>A</h1>
                    <h3 className=''>THE ATMOSPHERE</h3>
                    <p className=''>Specializing in: precision cutting, balayage, creative hair colour and keratin smooting treatments.</p>
                    <NavLink to="/commingSoon"><button className=''>View More</button></NavLink>
                </div>
                <div className="hairContent hairContent3 text-center col-lg-3 col-md-6 col-sm-12">
                    <h1 className=''>I</h1>
                    <h3 className=''>OUR BEST GROUP</h3>
                    <p className=''>We are looking forward to providing fun, relaxing and safe appointment experience.</p>
                    <NavLink to="/commingSoon"><button className=''>View More</button></NavLink>
                </div>
                <div id='verySpecial' className="hairContent hairContent4 text-center col-lg-3 col-md-6 col-sm-12">
                    <h1 className=''>R</h1>
                    <h3 className=''>BEAUTY PRODUCTS</h3>
                    <p className=''>From barely pink to balayage blonde, our color experts will nail any tone you can imagine.</p>
                    <NavLink to="/commingSoon"><button className=''>View More</button></NavLink> 
                </div>
            </div>
        </div>
    );
};

export default Hair;