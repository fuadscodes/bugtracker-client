import styled from 'styled-components';
import { Spin } from 'antd';

export const StyledCharts = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const Graph = styled.div`
    width: 48%;
    height: auto;
    @media (max-width: 450px) {
        width: 95%;
        height: 150px;
        margin-bottom: 35px;
    }
`;

export const StyledSpiner = styled(Spin)`
    width: 100%;
    text-align: center;
`;
