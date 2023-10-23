import React from 'react';
import './CommingSoon.css';
import imaggee from '../../../Images/HomePage/commingSoon.png';
import { useEffect } from 'react';
import useTitle from '../../../hooks/useTitle';

const CommingSoon = () => {
    useTitle('Cooming Soon')
    useEffect(() => {
    window.scrollTo(0,0)
}, [])
    return (
        <div className='commimgSoon' id="cSoon">
            <div className="cc">
                <h1><marquee behavior="scroll" direction="left" scrollamount="30">COMMING SOON COMMING SOON COMMING SOON COMMING SOON COMMING SOON COMMING SOON COMMING SOON COMMING SOON COMMING SOON COMMING SOON COMMING SOON COMMING SOONCOMMING SOON COMMING SOON COMMING SOON</marquee></h1>
            </div>
            <div className="imgg">
                <img src={imaggee} alt="" />
            </div>
        </div>
    );
};

export default CommingSoon;

