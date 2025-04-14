import { Button, Col, Form, notification, Row } from "antd";
import { useSettingsContext } from "../../context/SettingsContextProvider";
import { useCallback, useMemo } from "react";
import { FormItemStyled, InputNumberStyled } from "./styles";
import SimpleLoading from "src/components/loading/SimpleLoading";
import { isEmpty } from "lodash";

interface IFormFields {
    cooldownTime: number
}

const FactoryForm = () => {
    const { settings, setCooldownTime } = useSettingsContext();
    const initialValues = useMemo(() => ({ 
        cooldownTime: settings.cooldownTime 
    }), [settings.cooldownTime]);

    const onFinish = useCallback(({ cooldownTime }: IFormFields) => {
        if (cooldownTime === settings?.cooldownTime) {
            notification.error({
                message: 'Error in update cooldown time',
                description: 'Cooldown time is the same as the current one',
            });
            return;
        }

        setCooldownTime(cooldownTime);
    }, [settings]);

    if (isEmpty(settings)) {
        return <SimpleLoading />;
    }

    return (
        <Form
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <Row align="middle">
                <Col span={8}>
                    <FormItemStyled
                        label="Cooldown Time (in seconds)"
                        name="cooldownTime"
                        layout="vertical"
                        rules={[{ required: true, message: 'Please input your "cooldown time"!' }]}
                        
                    >
                        <InputNumberStyled />
                    </FormItemStyled>
                </Col>
                <Col span={16}>
                    <Button htmlType="submit">
                        Update
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default FactoryForm;