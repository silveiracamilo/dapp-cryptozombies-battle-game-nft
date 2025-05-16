import { Pagination } from "antd";
import styled from "styled-components";

export const PaginationStyled = styled(Pagination)`
    margin-top: 16px;

    .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link {
        color: #FFF;
    }

    .ant-pagination-prev .ant-pagination-item-link:hover, .ant-pagination-next .ant-pagination-item-link:hover {
        color: #000;
        background-color: #FFF;
    }

    .ant-pagination-jump-prev .ant-pagination-item-link .ant-pagination-item-ellipsis, .ant-pagination-jump-next .ant-pagination-item-link .ant-pagination-item-ellipsis {
        color: #FFF;
    }

    .ant-pagination-disabled .ant-pagination-item-link, .ant-pagination-disabled .ant-pagination-item-link:hover {
        color: #666;
    }

    .ant-pagination-item a:hover {
        color: #b6a764;
        background-color: #FFF;
        border-radius: 6px;
    }
`;
