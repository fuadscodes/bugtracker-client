import styled from 'styled-components';

export const StyledWindow = styled.div`
    width: auto;
    height: auto;
    border-radius: 15px;
    background-color: whitesmoke;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 20px;
    box-shadow: 0 3px 20px #CCC;
    font-family: 'Roboto', sans-serif;

    input {
        border: none;
        border-bottom: 1px solid lightgray;
        background-color: transparent;
        height: 25px;
        margin-bottom: 15px;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 17px;
        width: 85%;
        color: gray;
    }

    input:focus {
        color: #F16B2E;
        outline: 0;
        border-bottom: 1.5px solid #f16b2e;
        transition-duration: 0.5s;
    }

    h1 {
        color: #F4A72B;
        font-size: 20px;
    }

    button {
        color: gray;
    }

    button:hover {
        color: #F4A72B;
        transition-duration: 0.5s;
    }
`;