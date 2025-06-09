import { Button, Col, Form, Input, notification, Row } from "antd";
import { useSettingsContext } from "../../context/SettingsContextProvider";
import { useCallback, useMemo } from "react";
import { FormItemStyled } from "./styles";
import SimpleLoading from "@/components/loading/SimpleLoading";
import { isEmpty } from "lodash";

interface IFormFields {
    baseUrlTokenURI: string
}

const OwnershipForm = () => {
    const { settings, setBaseUrlTokenURI } = useSettingsContext();
    const initialValues = useMemo(() => ({ 
        baseUrlTokenURI: settings.baseUrlTokenURI 
    }), [settings.baseUrlTokenURI]);

    const onFinish = useCallback(({ baseUrlTokenURI }: IFormFields) => {
        if (baseUrlTokenURI === settings?.baseUrlTokenURI) {
            notification.error({
                message: 'Error in update Base Url Token URI',
                description: 'Base Url Token URI is the same as the current one',
            });
            return;
        }

        setBaseUrlTokenURI(baseUrlTokenURI);
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
                        label="Base Url Token URI"
                        name="baseUrlTokenURI"
                        rules={[{ required: true, message: 'Please input your "Base Url Token URI"!' }]}
                        style={{ width: '95%' }}
                        layout="vertical"
                    >
                        <Input type="url" />
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

export default OwnershipForm;