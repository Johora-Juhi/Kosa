import React from 'react';
import './AboutStories.css';
import img1 from '../../../../src/Images/AboutPage/aboutGallery.jpg';
import img2 from '../../../../src/Images/AboutPage/aboutGallery2.jpg';
import img3 from '../../../../src/Images/AboutPage/aboutGallery3.jpg';
import { Link } from 'react-router-dom';

const AboutStories = () => {
    return (
        <div className='aboutStories'>
            <div className="container">
                <div className="overwriteTitleCS">
                    <div className="specialLetterCS">G</div>
                    <div className="mainTitleCS">TELLING AMAZING <br /> STORIES WITH HAIR</div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <img style={{ width: '100%' }} src={img1} alt="" />
                        <h3>LINDSEY JONES</h3>
                        <h5>General Manager</h5>
                        <div className='asIcons'>
                            <Link to="/commingSoon"><i className="fa-brands fa-instagram"></i></Link>
                            <Link to="/commingSoon"><i className="fa-brands fa-facebook-messenger"></i></Link>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-4">
                        <img style={{ width: '100%' }} src={img2} alt="" />
                        <h1>LILLY CHEVEUX</h1>
                        <h5>Hairstylist / Colorist</h5>
                        <div className='asIcons'>
                            <Link to="/commingSoon"><i className="fa-brands fa-instagram"></i></Link>
                            <Link to="/commingSoon"><i className="fa-brands fa-facebook-messenger"></i></Link>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-3">
                        <img style={{ width: '100%' }} src={img3} alt="" />
                        <h3>BEN SMITH</h3>
                        <h5>Hairstylist / Colorist</h5>
                        <div className='asIcons'>
                            <Link to="/commingSoon"><i className="fa-brands fa-instagram"></i></Link>
                            <Link to="/commingSoon"><i className="fa-brands fa-facebook-messenger"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutStories;