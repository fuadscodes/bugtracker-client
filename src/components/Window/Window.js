import React from "react";
import { StyledWindow } from './style';

const Window = (props) => {
    return (
        <StyledWindow>
            {props.children}
        </StyledWindow>
    )
}

export default Window;
