import styled from 'styled-components';

export const StyledDashboard = styled.div`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

export const Right = styled.div`
    width: 100%;
    padding: 2%;
    display: inline-block;
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;

export const StyledButton = styled.button`
    padding-top: 17%;
    background-color: transparent;
    border: none;
    font: 17px "Lucida Grande", Helvetica, Arial, sans-serif;
    font-weight: bold;
    color: #F16B2E;
    outline: 0;
    &:hover{
        cursor: pointer;
        color: #F4A72B;
        transition-duration: 0.2s;
    }
`;

export const ListButton = styled.button`
    padding-top: 13%;
    background-color: transparent;
    border: none;
    font: 17px "Lucida Grande", Helvetica, Arial, sans-serif;
    font-weight: bold;
    color: #F16B2E;
    outline: 0;
    &:hover{
        cursor: pointer;
        color: #F4A72B;
        transition-duration: 0.2s;
    }
`;

export const StyledButtonTwo = styled.button`
    background-color: transparent;
    border: none;
    font: 25px "Lucida Grande", Helvetica, Arial, sans-serif;
    font-weight: bold;
    color: #F16B2E;
    outline: 0;
    padding-top: 15px;
    padding-left: 15px;
    &:hover{
        cursor: pointer;
        color: #F4A72B;
        transition-duration: 0.2s;
    }
`;

export const SideDrawer = styled.div`
    background-color: whitesmoke;
    position: fixed;
    width: 200px;
    max-width: 60%;
    height: 100%;
    left:0;
    top: 0;
    box-sizin: border-box;
    z-index: 200;

`;