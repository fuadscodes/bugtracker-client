import styled from 'styled-components';

export const StyledToolbar = styled.div`
    position: fixed;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: whitesmoke;
    box-shadow: 0 3px 8px #CCC;
    padding: 5px;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    z-index: 200;
`;

export const Right = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2%;
`;