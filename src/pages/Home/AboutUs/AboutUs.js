import React from 'react';
import './AboutUs.css';
import imageAbout from '../../../../src/Images/HomePage/HomeAboutGirl.jpg'
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className='aboutUs'>
            <div className="row m-0">
                <div className="col-md-12 col-lg-5 p-0">
                    <img className='w-100 h-100' src={imageAbout} alt="" />`
                </div>
                <div className="col-md-12 col-lg-7 aboutUsContent p-5 ">
                    <h2>ABOUT US</h2>
                    <h1 className='px-5'>WE TELL AMAZING STORIES WITH HAIR</h1>
                    <p className='px-5'>"We believe our work is best done when it is done with passion and with perfection. We always strive to do something different, something better, something new, This is the place where passion, lifestyle and beauty all come together."</p>
                    <NavLink to="/contact"><button className='aboutUsBtn'>BOOK NOW</button></NavLink>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;