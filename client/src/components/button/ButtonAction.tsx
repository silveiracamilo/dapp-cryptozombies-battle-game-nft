import { Button, ButtonProps, ConfigProvider } from "antd";
import React from "react";
import patternBg from 'src/assets/images/green-dust-and-scratches.png';

const ButtonAction: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultBg: `url(${patternBg}) #928313`,
                        contentFontSize: 26,
                        fontWeight: 'bold',
                        colorBorder: undefined,
                        controlHeight: 70,
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
export default ButtonAction;
