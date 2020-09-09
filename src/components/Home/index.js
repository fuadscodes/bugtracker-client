import React from 'react';
import { HomeWrapper, Red, Orange } from './style';
import bug from './icon.png';

const Home = () => {
    return (
        <HomeWrapper>
            <h3>Wellcome to <Red>Bug</Red><Orange>Tracker</Orange></h3>
            <img src={bug} alt="bug" width="250px" />
        </HomeWrapper>
    )
}

export default Home;