import React from 'react';
import { StyledError, BugImage, Number, Text } from './style';

const ErrorPage = (props) => {
    return (
        <StyledError>
            <BugImage>
                <img src="icon.png" alt="bugTracker" width="30%"/>
            </BugImage>
            <Number>404</Number>
            <Text>We are sorry but the page you were looking for was not found...</Text>
        </StyledError>
    )
}

export default ErrorPage;