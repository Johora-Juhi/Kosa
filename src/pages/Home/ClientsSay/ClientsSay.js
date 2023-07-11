import React from 'react';
import { Carousel } from 'react-bootstrap';
import './ClientsSay.css';
import imgg1 from '../../../../src/Images/HomePage/FemaleClient.jpg';
import imgg2 from '../../../../src/Images/HomePage/MaleClient.jpg';
import imgg3 from '../../../../src/Images/HomePage/newClient.jpg';
import imgg4 from '../../../../src/Images/HomePage/cLogo.png';

const ClientsSay = () => {
    return (
        <div className='clientsSay pb-5'>
            <div className="overwriteTitle">
                <div className="specialLetter">O</div>
                <div className="mainTitle">OUR CLIENTS SAY</div>
            </div>
            <div className="container px-5 pt-0 pb-5">
                <Carousel fade>
                    <Carousel.Item interval={2000} >
                        <div className="row p-0">
                            <div className="col-lg-6 col-md-12 p-0 flexWork py-5">
                                <img src={imgg4} alt="" />
                                <h1 className='px-5 text-center clientText'>“My hair is transformed into a vibrant, healthy looking style that draws compliments.”</h1>
                                <h5 className='smLtr'>SARAH GERARD</h5>
                                <h6 className='smLtr'>Haircut, color & styling by Lilly</h6>
                            </div>
                            <div className="col-lg-6 col-md-12 p-0">
                                <img className='w-100 p-0' src={imgg1} alt="" />
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={2000} >
                        <div className="row p-0">
                            <div className="col-lg-6 col-md-12 p-0 flexWork py-5">
                                <img src={imgg4} alt="" />
                                <h1 className='px-5 text-center clientText'>“Kosa is revolutionizing hair with custom made formulas for type of hair and color.”</h1>
                                <h5 className='smLtr'>JESSICA SMITH</h5>
                                <h6 className='smLtr'>Hairstyle & balayage</h6>
                            </div>
                            <div className="col-lg-6 col-md-12 p-0">
                                <img className='w-100 p-0' src={imgg2} alt="" />
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={2000} >
                        <div className="row p-0">
                            <div className="col-lg-6 col-md-12 p-0 flexWork py-5">
                                <img src={imgg4} alt="" />
                                <h1 className='px-5 text-center clientText'>"I am so in love with it and will change to any other brand! It leaves your hair shiny."</h1>
                                <h5 className='smLtr'>NICK LEWIS</h5>
                                <h6 className='smLtr'>Cutting, coloring & styling</h6>
                            </div>
                            <div className="col-lg-6 col-md-12 p-0">
                                <img className='w-100 p-0' src={imgg3} alt="" />
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
};

export default ClientsSay;