import styled from 'styled-components';
import { Button, Spin } from 'antd';

export const StyledButton = styled(Button)`
    height: auto;
    widht: auto;
    margin-right: 10px;
    color: #F16B2E;
    width: auto;
    &:focus, &:active, &:hover{
        color: #F16B2E;
        border: 0.5px solid #F16B2E;
        transition-duration: 0.5s;
    }
`;

export const StyledTable = styled.table`
    width: 100%;
    box-shadow: 0 3px 18px #CCC;
    tr:nth-child(even) {background-color: whitesmoke;} 
    td {
        padding: 1%;
        width: 44%;
    }
    th {
        background-color: #091F2E;
        color:whitesmoke;
        padding: 1%;
    }
    @media (max-width: 450px) {
        th {
            text-align: center;
        }
        td {
            text-align: center;
        }
    }
`;

export const StyledTableTwo = styled.table`
    width: 100%;
    box-shadow: 0 3px 18px #CCC;
    tr:nth-child(even) {background-color: whitesmoke;} 
    td {
        padding: 1%;
        width: 18%;
    }
    th {
        background-color: #091F2E;
        color:whitesmoke;
        padding: 1%;
    }
    @media (max-width: 450px) {
        th {
            width: 20%;
            text-align: center;
        }
        td {
            width: 20%;
            text-align: center;
        }
    }
`;

export const StyledDiv = styled.div`
    margin-bottom: 15px;
`;

export const StyledSpiner = styled(Spin)`
    width: 100%;
    text-align: center;
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
`;