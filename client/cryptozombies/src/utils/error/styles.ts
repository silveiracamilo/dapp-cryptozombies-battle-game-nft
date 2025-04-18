import styled from "styled-components";

import { Layout } from "antd";
import { type LayoutProps } from "antd/lib/layout";
const { Content } = Layout;

export const ContentContainer: typeof Content = styled(Content)<LayoutProps>`
	min-height: 100vh;
	background: #ebeadb;
`;
