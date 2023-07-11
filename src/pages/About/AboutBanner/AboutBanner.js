import React from 'react';
import './AboutBanner.css';

const AboutBanner = () => {
    return (
        <div className='aboutBanner'>
            <div className="overwriteTitleAbout">
                <div className="specialLetterA">A</div>
                <div className="mainTitleA">ABOUT US</div>
            </div>
            <h2>KOSA SALON</h2>
            <h3 className='pb-5'>Designed to maintain your current colour, blend out a growing root or balance your blonde while providing full and demi-permanent coverage.</h3>
        </div>
    );
};

export default AboutBanner;