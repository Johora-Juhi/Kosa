import React from 'react';
import './AboutMarketing.css';
import img1 from '../../../../src/Images/AboutPage/aboutIcon1.png';
import img2 from '../../../../src/Images/AboutPage/aboutIcon2.png';
import img3 from '../../../../src/Images/AboutPage/aboutIcon3.png';
import img4 from '../../../../src/Images/AboutPage/aboutIcon4.png';
import { Card } from 'react-bootstrap';

const AboutMarketing = () => {
    return (
        <div className='aboutMarketing'>
            <div className="container">
                <div className="row aboutRow">
                    <div className="col-xl-3 col-lg-12">
                        <Card>
                            <div className="cardSection">
                                <div>
                                    <Card.Img className='aboutCImg' variant="top" src={img1} />
                                </div>
                                <div>
                                    <h3>500+</h3>
                                    <h4>FASHION SHOWS</h4>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-12">
                        <Card>
                            <div className="cardSection">
                                <div>
                                    <Card.Img className='aboutCImg' variant="top" src={img2} />
                                </div>
                                <div>
                                    <h3>15</h3>
                                    <h4>TOP COLORISTS</h4>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-12">
                        <Card>
                            <div className="cardSection">
                                <div>
                                    <Card.Img className='aboutCImg' variant="top" src={img3} />
                                </div>
                                <div>
                                    <h3>100%</h3>
                                    <h4>UNIQUE STYLES</h4>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-12">
                        <Card>
                            <div className="cardSection">
                                <div>
                                    <Card.Img className='aboutCImg' variant="top" src={img4} />
                                </div>
                                <div>
                                    <h3>25+</h3>
                                    <h4>BEST PRODUCTS</h4>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMarketing;