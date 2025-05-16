import React from "react";
import { PaginationStyled } from "./styles";
import { PaginationProps } from "antd";

const CZBPagination: React.FC<PaginationProps> = ({ total = 0, pageSize = 10, ...props }) => {
    if (total <= pageSize) return <></>;

    return (
        <PaginationStyled
            defaultCurrent={1}
            align="center"
            showSizeChanger={false}
            pageSize={pageSize}
            total={total}
            {...props}
        />
    );
}

export default CZBPagination;
