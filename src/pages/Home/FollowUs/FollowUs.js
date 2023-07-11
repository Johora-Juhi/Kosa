import React from 'react';
import './FollowUs.css';
import gallery1 from '../../../../src/Images/HomePage/Gallery1.jpg';
import gallery2 from '../../../../src/Images/HomePage/Gallery2.jpg';
import gallery3 from '../../../../src/Images/HomePage/Gallery3.jpg';
import gallery4 from '../../../../src/Images/HomePage/GAllery4.jpg';
import gallery5 from '../../../../src/Images/HomePage/Gallery5.jpg';
import gallery6 from '../../../../src/Images/HomePage/Gallery6.jpg';
import gallery7 from '../../../../src/Images/HomePage/Gallery7.jpg';
import gallery8 from '../../../../src/Images/HomePage/Gallery8.jpg';
import gallery9 from '../../../../src/Images/HomePage/Gallery9.jpg';

const FollowUs = () => {
    return (
        <div className='followUs'>
            <div className="container">
                <div className="overwriteTitle ">
                    <div className="specialLetter">F</div>
                    <div className="mainTitle">FOLLOW US</div>
                </div>
                <div className="gallery-container p-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 p-0"><img className='w-100' src={gallery1} alt="" /></div>
                        <div className="col-lg-4 col-md-12 p-0"><img className='w-100' src={gallery2} alt="" /></div>
                        <div className="col-lg-4 col-md-12 p-0"><img className='w-100' src={gallery3} alt="" /></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-12 p-0"><img className='w-100' src={gallery4} alt="" /></div>
                        <div className="col-lg-4 col-md-12 p-0"><img className='w-100' src={gallery5} alt="" /></div>
                        <div className="col-lg-4 col-md-12 p-0"><img className='w-100' src={gallery6} alt="" /></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-12 p-0"><img className='w-100' src={gallery7} alt="" /></div>
                        <div className="col-lg-4 col-md-12 p-0"><img className='w-100' src={gallery8} alt="" /></div>
                        <div className="col-lg-4 col-md-12 p-0"><img className='w-100' src={gallery9} alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FollowUs;