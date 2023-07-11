import React from 'react';
import { Link } from 'react-router-dom';
import './AboutJoinOurTeam.css';

const AboutJoinOurTeam = () => {
    return (
        <div className='aboutJoinOurTeam'>
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-12"></div>
                    <div className="col-md-7 col-12">
                        <h5 className='lgit'>LET’S GET IN TOUCH</h5>
                        <div className="overwriteTitleABB">
                            <div className="specialLetter">J</div>
                            <div className="mainTitleABB">JOIN IN OUR TEAM</div>
                        </div>
                        <h6>If you feel like sharing passion with us,<br/> please fill out the application form.</h6>
                        <Link className='aJOTbtn'>Apply Today</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutJoinOurTeam;