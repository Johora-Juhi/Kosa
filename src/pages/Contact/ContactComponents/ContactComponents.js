import React, { useEffect } from 'react';
import ContactBanner from '../ContactBanner/ContactBanner';
import ContactGetInTouch from '../ContactGetInTouch/ContactGetInTouch';
import ContactGift from '../ContactGift/ContactGift';

const ContactComponents = () => {
    useEffect(() => {
        window.scrollTo(0,0)
        }, [])
    return (
        <div>
            <ContactBanner></ContactBanner>
            <ContactGetInTouch></ContactGetInTouch>
            <ContactGift></ContactGift>
        </div>
    );
};

export default ContactComponents;