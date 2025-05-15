import { Row } from "antd";
import styled from "styled-components";

export const CardStyled = styled.div`
    border-radius: 8px;
    background: url("/images/textured-paper.png") #86835d88;
    background-blend-mode: darken;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`;

export const CardFooterStyled = styled(Row)`
    width: 100%;
    background-color: #262819;
    color: #b6a764;
    font-size: 16px;
    font-weight: bold;
    width: '100%';
    padding: 8px;
    display: block;
`;