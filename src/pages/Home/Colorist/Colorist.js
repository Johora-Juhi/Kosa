import React from 'react';
import './Colorist.css';
import female from '../../../../src/Images/HomePage//FemaleAppointment.jpg';
import { Link } from 'react-router-dom';

const Colorist = () => {
    return (
        <div className='colorist'>
            <div className="row m-0">
                <div className="col-lg-6 col-md-12 p-0 leftArtDirector">
                    <img className='w-100 h-100' src={female} alt="" />
                </div>
                <div className="col-lg-6 col-md-12 rightArtDirector">
                    <div className="overwriteTitle ">
                        <div className="specialLetter">L</div>
                        <div className="mainTitle">LILLY CHEVEUX</div>
                    </div>
                    <h2>Hairstylist / Colorist</h2>
                    <h3 className='pb-5'>Designed to maintain your current colour, blend out a growing root or balance your blonde while providing full and demi-permanent coverage. Our custom kit can disguise grey-white hair.</h3>
                    <Link to="/contact">Book an Appointment</Link>
                </div>
            </div>
        </div>
    );
};

export default Colorist;