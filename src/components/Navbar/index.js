import React from "react";
import Logo from "../Logo/index";
import { Right, StyledNavbar } from './style';
 
const Toolbar = (props) => {
    return(
        <StyledNavbar>
            <Logo />
            <Right>{ props.children }</Right>
        </StyledNavbar>
    )
};

export default Toolbar;
