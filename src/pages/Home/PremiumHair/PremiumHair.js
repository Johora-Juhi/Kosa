import React from 'react';
import { Link } from 'react-router-dom';
import './PremiumHair.css';
import imagee from '../../../../src/Images/HomePage/comb.png'

const PremiumHair = () => {
    return (
        <div className='premiumHair py-5'>
            <div className="container">
                <div className="premiumHairContent py-5">
                    <div className="row m-0 pb-4">
                        <div className="col-lg-6 col-md-12">
                            <div className="overwriteTitleT ">
                                <div className="specialP">P</div>
                                <div className="mainTitleK">KOSA SALON</div>
                            </div>
                            <h1>PREMIUM HAIR SERVICES</h1>
                            <Link to="/commingSoon">Contact Us</Link>
                        </div>
                        <div className="col-lg-6 col-md-12 pHRight">
                            <div className="premiumHairRight ">
                                <div>
                                    <img src={imagee} alt="" />
                                </div>
                                <div>
                                    <h3>WE LOVE YOUR HAIR</h3>
                                    <h4>We are well equipped with years of hair know-how, and ready to create your best look with natural products.</h4>
                                </div>
                            </div>
                            <div className="premiumHairRight ">
                                <div>
                                    <img src={imagee} alt="" />
                                </div>
                                <div>
                                    <h3>
                                        ONLY NATURAL PRODUCTS</h3>
                                    <h4>Hair is our passion, and our passion shows on every client that walks out of our doors full of confidence.</h4>
                                </div>
                            </div>
                            <div className="premiumHairRight ">
                                <div>
                                    <img src={imagee} alt="" />
                                </div>
                                <div>
                                    <h3>PROFESSIONAL STYLISTS</h3>
                                    <h4>If you have a look you want but don't know how to achieve, we can work together to form a plan for your hair.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumHair;