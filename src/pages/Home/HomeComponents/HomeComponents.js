import React from 'react';
import { useEffect } from 'react';
import AboutUs from '../AboutUs/AboutUs';
import ArtDirector from '../ArtDirector/ArtDirector';
import Banner from '../Banner/Banner';
import ClientLogo from '../ClientLogo/ClientLogo';
import ClientsSay from '../ClientsSay/ClientsSay';
import Colorist from '../Colorist/Colorist';
import FollowUs from '../FollowUs/FollowUs';
import Hair from '../Hair/Hair';
import OpeningHours from '../OpeningHours/OpeningHours';
import PremiumHair from '../PremiumHair/PremiumHair';
import SendingInterest from '../SendingInterest/SendingInterest';

const HomeComponents = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            <Banner></Banner>
            <ClientLogo></ClientLogo>
            <AboutUs></AboutUs>
            <OpeningHours></OpeningHours>
            <Hair></Hair>
            <PremiumHair></PremiumHair>
            <ArtDirector></ArtDirector>
            <Colorist></Colorist>
            <FollowUs></FollowUs>
            <ClientsSay></ClientsSay>
            <SendingInterest></SendingInterest>
        </div>
    );
};

export default HomeComponents;