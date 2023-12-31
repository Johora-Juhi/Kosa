import React, { useEffect } from 'react';
import ClientLogo from '../../Home/ClientLogo/ClientLogo';
import AboutHairstylist from '../About Hairstylist/AboutHairstylist';
import AboutBanner from '../AboutBanner/AboutBanner';
import AboutJoinOurTeam from '../AboutJoinOurTeam/AboutJoinOurTeam';
import AboutMarketing from '../AboutMarketing/AboutMarketing';
import AboutOpeningHour from '../AboutOpeningHour/AboutOpeningHour';
import AboutStories from '../AboutStories/AboutStories';
import useTitle from '../../../hooks/useTitle';

const AboutComponents = () => {
    useTitle('About');

    useEffect(() => {
        window.scrollTo(0,0)
        }, [])
    return (
        <div>
            <AboutBanner></AboutBanner>
            <AboutMarketing></AboutMarketing>
            <AboutHairstylist></AboutHairstylist>
            <AboutStories></AboutStories>
            <ClientLogo></ClientLogo>
            <AboutOpeningHour></AboutOpeningHour>
            <AboutJoinOurTeam></AboutJoinOurTeam>
        </div>
    );
};

export default AboutComponents;