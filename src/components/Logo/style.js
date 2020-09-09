import styled from 'styled-components';

export const BugImage = styled.div`
    display: inline-block;
`;

export const Container = styled.div`
    font: 17px "Lucida Grande", Helvetica, Arial, sans-serif;
    display: flex;
    align-items: center;
`;

export const Red = styled.div`
    display: inline-block;
    color: #D82737;
    &:hover{
        transition-duration: 0.2s;
        cursor: default;
        color: #F4A72B;
    };
`;

export const Orange = styled.div`
    display: inline-block;
    color: #F16B2E;
    &:hover{
        transition-duration: 0.2s;
        cursor: default;
        color: #F4A72B;
    };
`;