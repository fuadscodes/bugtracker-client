import styled from 'styled-components';
import { Button, Spin, Input, Select } from 'antd';

export const StyledButton = styled(Button)`
    height: auto;
    widht: auto;
    margin-right: 10px;
    color: #F16B2E;
    width: 100px;
    &:focus, &:active, &:hover{
        color: #F16B2E;
        border: 0.5px solid #F16B2E;
        transition-duration: 0.5s;
    }
    @media (max-width: 450px) {
        width: 98%;
    }
`;

export const BackButton = styled(Button)`
    height: auto;
    widht: auto;
    margin-right: 10px;
    color: #F16B2E;
    width: 100px;
    &:focus, &:active, &:hover{
        color: #F16B2E;
        border: 0.5px solid #F16B2E;
        transition-duration: 0.5s;
    }
`;

export const StyledTable = styled.table`
    width: 98%;
    box-shadow: 0 3px 18px #CCC;
    tr:nth-child(even) {background-color: whitesmoke;} 
    margin-bottom: 10px;
    td {
        padding: 1%;
        width: 40%;
    }
    th {
        background-color: #091F2E;
        color:whitesmoke;
        padding: 1%;
    }
    @media (max-width: 450px) {
        td {
            width: 33%;
            text-align: center;
        }
        th {
            width: 33%;
            text-align: center;
        }
    }
`;

export const StyledTableTwo = styled.table`
    width: 98%;
    box-shadow: 0 3px 18px #CCC;
    tr:nth-child(even) {background-color: whitesmoke;} 
    td {
        padding: 1%;
        width: 27%;
    }
    th {
        background-color: #091F2E;
        color:whitesmoke;
        padding: 1%;
    }
    @media (max-width: 450px) {
        td {
            text-align: center;
        }
        th {
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
    margin-left: 5px;
    &:focus, &:active, &:hover{
        color: #F16B2E;
        border: 0.5px solid #F16B2E;
        transition-duration: 0.5s;
    }
`;

export const StyledInput = styled(Input)`
    width: 20%;
    margin-bottom: 10px;
    margin-top: 5px;
    @media (max-width: 450px) {
        width: 80%;
    }
`;

export const StyledSelect = styled(Select)`
    display: inline-block;
    width: 130px;
    @media (max-width: 450px) {
        margin-top: 10px;
    }
`;

export const StyledFileForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const StyledFileInput = styled(Input)`
    display: inline-block;
    width: 25%;
    margin-bottom: 10px;
    margin-top: 5px;
    border: none;
    @media (max-width: 450px) {
        width: 98%;
    }
`;

export const StyledNoteInput = styled(Input)`
    display: block;
    width: 25%;
    margin-bottom: 10px;
    margin-top: 5px;
    @media (max-width: 450px) {
        width: 98%;
    }
`;

export const StyledFilesTable = styled.table`
    width: 98%;
    box-shadow: 0 3px 18px #CCC;
    tr:nth-child(even) {background-color: whitesmoke;} 
    margin-top: 10px;
    margin-bottom: 10px;
    td {
        padding: 1%;
        width: 27%;
    }
    th {
        background-color: #091F2E;
        color:whitesmoke;
        padding: 1%;
    }
    @media (max-width: 450px) {
        td {
            text-align: center;
        }
        th {
            text-align: center;
        }
    }
`;