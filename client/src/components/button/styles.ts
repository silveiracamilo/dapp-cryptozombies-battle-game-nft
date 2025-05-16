import { Button } from "antd";
import styled from "styled-components";

export const ButtonActionStyled = styled(Button)`
    border: 0px;
    background: url("/images/green-dust-and-scratches.png") #928313;
    font-size: 26px;
    font-weight: bold;
    height: 70px;
    padding: 16px;

    &:hover {
        color: #928313 !important;
        background: url("/images/green-dust-and-scratches.png") #000000 !important;
        border-color: #000 !important;
    }
`;

export const CardButtonActionStyled = styled(Button)`
    border: 0px;
    background: url("/images/wall-4-light.png") #86835d;
    font-size: 14px;
    font-weight: bold;
    padding: 8px;
    
    &:hover {
        color: #928313 !important;
        background: url("/images/wall-4-light.png") #000000 !important;
        border-color: #000 !important;
    }
`;