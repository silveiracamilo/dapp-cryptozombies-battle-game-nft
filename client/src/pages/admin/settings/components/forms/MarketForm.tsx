import { Button, Col, Form, notification, Row } from "antd";
import { useSettingsContext } from "../../context/SettingsContextProvider";
import { useCallback, useMemo } from "react";
import { FormItemStyled, InputNumberStyled } from "./styles";
import SimpleLoading from "src/components/loading/SimpleLoading";
import { formatEther, parseEther } from "ethers";
import { isEmpty } from "lodash";

interface IFormFields {
    tax: bigint
    minPrice: bigint
}

const MarketForm = () => {
    const { settings, setTax, setMinPrice } = useSettingsContext();
    const { tax, minPrice } = settings;
    const initialValues = useMemo(() => ({
        tax: formatEther(tax.toString()),
        minPrice: formatEther(minPrice.toString()),
    }), [tax, minPrice]);

    const onFinishTax = useCallback(({ tax }: IFormFields) => {
        if (parseEther(tax.toString()) === settings.tax) {
            notification.error({
                message: 'Error in update Tax',
                description: 'Tax is the same as the current one',
            });
            return;
        }
        setTax(parseEther(tax.toString()));
    }, [settings]);
    
    const onFinishMinPrice = useCallback(({ minPrice }: IFormFields) => {
        if (parseEther(minPrice.toString()) === settings.minPrice) {
            notification.error({
                message: 'Error in update Min Price',
                description: 'Min Price is the same as the current one',
            });
            return;
        }
        setMinPrice(parseEther(minPrice.toString()));
    }, [settings]);

    if (isEmpty(settings)) {
        return <SimpleLoading />;
    }

    return (
        <>
        <Form
            initialValues={initialValues}
            onFinish={onFinishTax}
        >
            <Row align="middle">
                <Col span={8}>
                    <FormItemStyled
                        label="Tax (ether)"
                        name="tax"
                        rules={[{ required: true, message: 'Please input your "Tax"!' }]}
                        layout="vertical"
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
        <Form
            initialValues={initialValues}
            onFinish={onFinishMinPrice}
        >
            <Row align="middle">
                <Col span={8}>
                    <FormItemStyled
                        label="Min Price (ether)"
                        name="minPrice"
                        rules={[{ required: true, message: 'Please input your "Min Price"!' }]}
                        layout="vertical"
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
        </>
    )
}

export default MarketForm;