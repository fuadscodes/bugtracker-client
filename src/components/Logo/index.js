import React from "react";
import { BugImage, Container, Red, Orange } from './style';

const Logo = () => {
    return (
            <Container>
                <BugImage>
                    <img src="icon.png" alt="bugTracker" width="55px"/>
                </BugImage>
                <b><Red>Bug</Red><Orange>Tracker</Orange></b>
            </Container>
    )
};

export default Logo;
