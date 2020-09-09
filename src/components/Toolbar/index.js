import React from 'react';
import { StyledToolbar, Right } from './style';
import Logo from '../Logo';

const Toolbar = (props) => {
    return (
        <StyledToolbar>
            <Logo/>
            <Right>
                {props.children}
            </Right>
        </StyledToolbar>
    )
}

export default Toolbar;