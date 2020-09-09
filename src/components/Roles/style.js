import styled from 'styled-components';
import { Input, Spin, Button, Select } from 'antd';

export const StyledInput = styled(Input)`
    width: 50%;
    margin: 5px;
    @media (max-width: 450px) {
        width: 100%;
    }
`;

export const StyledTable = styled.table`
    width: 100%;
    box-shadow: 0 3px 18px #CCC;
    tr:nth-child(even) {background-color: whitesmoke;} 
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
            text-align: center;
        }
        th {
            text-align: center;
        }
    }
`;

export const StyledSpiner = styled(Spin)`
    width: 100%;
    text-align: center;
`;

export const StyledButton = styled(Button)`
    color: #F16B2E;
    width: auto;
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
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    @media (max-width: 450px) {
        flex-direction: column;
        justify-content: space-between;
    }
`;

export const StyledSelect = styled(Select)`
    width: 150px;
    margin-right: 15px;
    @media (max-width: 450px) {
        width: 100%;
        margin-bottom: 5px;
    }
`;
