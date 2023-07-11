import React from 'react';
import './ArtDirector.css';
import male from '../../../../src/Images/HomePage/MaleAppointment.jpg';
import { Link } from 'react-router-dom';

const ArtDirector = () => {
    return (
        <div className='artDirector'>
            <div className="row m-0">
                <div className="col-lg-6 col-md-12 leftArtDirector">
                    <div className="overwriteTitle ">
                        <div className="specialLetter">G</div>
                        <div className="mainTitle">GEROME CHEVEUX</div>
                    </div>
                    <h2>Hairstylist / Art director</h2>
                    <h3 className='pb-5'>We are well equipped with years of hair know-how, and ready to create your best look with natural products. Hair is our passion, and our passion shows on every client that walks out of our doors full of confidence.</h3>
                    <Link to="/contact">Book an Appointment</Link>
                </div>
                <div className="col-lg-6 col-md-12 p-0">
                    <img className='w-100 h-100' src={male} alt="" />
                </div>
            </div>
        </div>
    );
};

export default ArtDirector;