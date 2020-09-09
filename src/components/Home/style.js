import styled from 'styled-components';

export const HomeWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 80vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font: 17px "Lucida Grande", Helvetica, Arial, sans-serif;
    color: #C0C0C0;
`;

export const Red = styled.div`
    display: inline-block;
    color: #D82737;
    font-weight: bold;
    &:hover{
        transition-duration: 0.2s;
        cursor: default;
        color: #F4A72B;
    };
`;

export const Orange = styled.div`
    display: inline-block;
    color: #F16B2E;
    font-weight: bold;
    &:hover{
        transition-duration: 0.2s;
        cursor: default;
        color: #F4A72B;
    };
`;