import React from 'react';
import './ContactGift.css';

const ContactGift = () => {
    return (
        <div className='contactGift'>
            <div className="row m-0 p-0">
                <div className="col-lg-6"></div>
                <div className="col-md-12 col-lg-6 cgRight">
                    <div className="container">
                        <div className="cgContainer">
                            <div className="overwriteTitleContact">
                                <div className="specialLetterContact">G</div>
                                <div className="mainTitleContactss">GIFT VOUCHER</div>
                            </div>
                            <p>Available for all occasions, for a specific treatment or monetary amount. Please call us or email us for more details.</p>
                            <h2><i className="fa-solid fa-phone"></i>  +32 94584 4850</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactGift;