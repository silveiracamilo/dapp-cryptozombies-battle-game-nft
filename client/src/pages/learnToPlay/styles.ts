import { Typography } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

export const ContainerStyled = styled.div`
  width: 900px;
  margin: 0 calc((100vw - 900px) / 2);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CardContentStyled = styled.div`
    border-radius: 8px;
    background: #262819;
    padding: 16px;
    filter: drop-shadow(5px 5px 44px #00FF0055);
`;

export const SectionStyled = styled.div`
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export const TitleStyled = styled(Title)`
  color: #b6a764 !important;
`;

export const ParagraphStyled = styled(Paragraph)`
  color: #b6a764 !important;
  font-size: 16px;
`;