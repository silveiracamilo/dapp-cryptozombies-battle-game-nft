import { Button, ButtonProps, ConfigProvider } from "antd";
import React from "react";
import patternBg from 'src/assets/images/wall-4-light.png';

const CardButtonAction: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultBg: `url(${patternBg}) #86835d`,
                        contentFontSize: 14,
                        fontWeight: 'bold',
                        colorBorder: undefined,
                        padding: 40,
                        defaultHoverColor: '#928313',
                        defaultHoverBg: `url(${patternBg}) #000`,
                        defaultHoverBorderColor: '#000',
                    },
                },
            }}
        >
            <Button {...props}>{children}</Button>
        </ConfigProvider>
    );
}
export default CardButtonAction;


