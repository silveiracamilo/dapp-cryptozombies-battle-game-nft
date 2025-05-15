import styled from "styled-components";

import { Alert, Layout } from "antd";
import { type LayoutProps } from "antd/lib/layout";
const { Content } = Layout;

export const ContentContainer: typeof Content = styled(Content)<LayoutProps>`
	width: 100vw;
	min-height: 100vh;
	background: #ebeadb;
`;

export const AlertStyled = styled(Alert)`
	width: 300px; 
	margin-left: calc(50% - 150px);
	top: calc(50vh - 65px);
`
