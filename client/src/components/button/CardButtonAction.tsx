import { ButtonProps } from "antd";
import React from "react";
import { CardButtonActionStyled } from "./styles";

const CardButtonAction: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <CardButtonActionStyled {...props}>
            {children}
        </CardButtonActionStyled>
    );
}
export default CardButtonAction;


