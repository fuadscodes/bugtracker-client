import React from "react";
import { StyledButton } from './style';

const Button = (props) => {
    return (
        <a href={props.link}>
            <StyledButton onClick={props.click}>{props.children}</StyledButton>
        </a>
    )
};

export default Button;
