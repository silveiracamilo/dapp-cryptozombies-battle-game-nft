import { Layout } from "antd";
import styled from "styled-components";

const { Header, Content, Footer } = Layout;

export const LayoutStyled = styled(Layout)`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background-color: #000;
`;

export const HeaderStyled = styled(Header)`
    display: flex;
    align-items: center;
    gap: 32px;
    background: #000000;
`;

export const ScoreStyled = styled.div`
    background-color: #222;
    padding: 8px;
    font-size: 20px;
    line-height: 20px;
    height: 40px;
    border-radius: 10px;
    color: #b6a764;
`;

export const ContentStyled = styled(Content)`
    padding: 20px;
`;

export const FooterStyled = styled(Footer)`
    text-align: center;
    background: #000;
    color: white;
`;
