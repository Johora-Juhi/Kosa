import React from 'react';
import './Banner.css';
import 'animate.css';
import { Carousel } from 'react-bootstrap';
import Banner1 from '../../../../src/Images/HomePage/HomeBannerMale.jpg';
import Banner2 from '../../../../src/Images/HomePage/HomeBannerFemale.jpg';

const Banner = () => {
    return (
        <div>
            <Carousel fade >
                <Carousel.Item interval={2000} className='bannerComponents' >
                    <div className="imgSection">
                        <img
                            className="d-block w-100 imgHeight"
                            src={Banner1} 
                            alt="First slide"
                        />
                    </div>
                    <div className="componentSection">
                        <h1 className='animate__animated animate__fadeInUp'>LUG GEROME</h1>
                        <h2 className='animate__animated animate__fadeInUp'>PERFECT CUT</h2>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <div className="imgSection">
                        <img
                            className="d-block w-100 imgHeight"
                            src={Banner2}
                            alt="Second slide"
                        />
                    </div>
                    <div className="componentSection">
                        <h1 className='animate__animated animate__fadeInUp'>L'ATELIER</h1>
                        <h2 className='animate__animated animate__fadeInUp'>PERFECT STYLE</h2>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Banner;