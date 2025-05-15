import { ButtonProps } from "antd";
import React from "react";
import { ButtonActionStyled } from "./styles";

const ButtonAction: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <ButtonActionStyled {...props}>
            {children}
        </ButtonActionStyled>
    );
}

export default ButtonAction;
