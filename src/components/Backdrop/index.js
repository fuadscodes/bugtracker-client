import React from 'react';
import { StyledDiv } from './style';

const Backdrop = (props) => {
    return(
        <StyledDiv onClick={props.clicked} />
    )
}

export default Backdrop;