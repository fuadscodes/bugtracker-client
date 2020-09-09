import styled from 'styled-components';
import { Button } from 'antd';

export const StyledButton = styled(Button)`
    color: #F16B2E;
    width: 200px;

    &:focus, &:active, &:hover{
        color: #F16B2E;
        border: 0.5px solid #F16B2E;
        transition-duration: 0.5s;
    }
    @media (max-width: 450px) {
        width: 100%;
    }
`;

export const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    width: 200px;
    @media (max-width: 450px) {
        width: 100%;
    }
`;

export const StyledInput = styled.input`
    width: 95%;
    border: none;
    border-bottom: 1px solid lightgray;
    background-color: transparent;
    height: 25px;
    margin-bottom: 15px;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 17px;
    color: gray;

    &:focus, &:active{
        color: #F16B2E;
        outline: 0;
        border-bottom: 1.5px solid #f16b2e;
        transition-duration: 0.5s;
    }
`;