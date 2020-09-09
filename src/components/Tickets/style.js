import styled from 'styled-components';
import { Button, Input, Spin } from 'antd';

export const StyledForm = styled.div`
    width: 350px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;

    @media (max-width: 450px) {
        width: 100%;
    }
`;

export const StyledButton = styled(Button)`
    color: #F16B2E;
    width: auto;
    &:focus, &:active, &:hover{
        color: #F16B2E;
        border: 0.5px solid #F16B2E;
        transition-duration: 0.5s;
    }
`;

export const StyledButtonTwo = styled(Button)`
    color: #F16B2E;
    width: auto;
    margin-top: 5px;
    &:focus, &:active, &:hover{
        color: #F16B2E;
        border: 0.5px solid #F16B2E;
        transition-duration: 0.5s;
    }
    @media (max-width: 450px) {
        width: 100%;
    }
`;

export const StyledInput = styled(Input)`
    width: 100%;
    margin-bottom: 5px;
    margin-top: 5px;
    @media (max-width: 450px) {
        width: 100%;
    }
`;

export const StyledTable = styled.table`
    width: 100%;
    box-shadow: 0 3px 18px #CCC;
    tr:nth-child(even) {background-color: whitesmoke;} 
    margin-bottom: 10px;
    td {
        padding: 1%;
        width: 10%;
    }
    th {
        background-color: #091F2E;
        color:whitesmoke;
        padding: 1%;
    }
    @media (max-width: 450px) {
        th {
            width: 33%;
            text-align: center;
        }
        td {
            width: 33%;
            text-align: center;
        }
    }
`;

export const StyledSpiner = styled(Spin)`
    width: 100%;
    text-align: center;
`;