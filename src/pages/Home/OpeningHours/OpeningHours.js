import React from 'react';
import { NavLink } from 'react-router-dom';
import './OpeningHours.css';

const OpeningHours = () => {
    return (
        <div className='openingHours'>
            <div className="container">
                <div className="row openingHoursMainContent">
                    <div className="openingHoursContent col-md-12 col-lg-6 d-flex justify-content-center flex-column align-items-center">
                        <h2>YOU ARE WELCOME</h2>
                        <h1>OPENING HOURS</h1>
                        <div className="aboutUsBtns">
                            <NavLink to="/contact"><button className='btn1oh mx-3'>Book Now</button></NavLink>
                            <NavLink to="/commingSoon"><button className='btn2oh mx-3'>Get a quote</button></NavLink>
                        </div>
                    </div>
                    <div className="openingHoursTime ps-5 py-5 col-md-12 col-lg-6 ">
                        <h3>WORKING DAYS / 14:00 - 20:00</h3>
                        <h3>SATUDAY / 19:00 - 17:00</h3>
                        <h3>SUNDAY / CLOSED</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpeningHours;