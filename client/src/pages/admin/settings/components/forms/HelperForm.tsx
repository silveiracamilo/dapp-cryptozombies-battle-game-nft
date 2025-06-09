import { Button, Col, Form, notification, Row } from "antd";
import { useSettingsContext } from "../../context/SettingsContextProvider";
import { useCallback, useMemo } from "react";
import { FormItemStyled, InputNumberStyled } from "./styles";
import SimpleLoading from "@/components/loading/SimpleLoading";
import { formatEther, parseEther } from "ethers";
import { isEmpty } from "lodash";

interface IFormFields {
    levelUpFee: bigint
    changeNameFee: bigint
    changeDNAFee: bigint
}

const HelperForm = () => {
    const { 
        settings, 
        setLevelUpFee,
        setChangeNameFee,
        setChangeDNAFee,
    } = useSettingsContext();
    const { levelUpFee, changeNameFee, changeDNAFee } = settings;
    const initialValues = useMemo(() => ({
        levelUpFee: formatEther(levelUpFee.toString()),
        changeNameFee: formatEther(changeNameFee.toString()),
        changeDNAFee: formatEther(changeDNAFee.toString())
    }), [levelUpFee, changeNameFee, changeDNAFee]);

    const onFinishLevelUpFee = useCallback(({ levelUpFee }: IFormFields) => {
        if (parseEther(levelUpFee.toString()) === settings?.levelUpFee) {
            notification.error({
                message: 'Error in update Level Up Fee',
                description: 'Level Up Fee is the same as the current one',
            });
            return;
        }
        setLevelUpFee(parseEther(levelUpFee.toString()));
    }, [settings]);

    const onFinishChangeNameFee = useCallback(({ changeNameFee }: IFormFields) => {
        if (parseEther(changeNameFee.toString()) === settings?.changeNameFee) {
            notification.error({
                message: 'Error in update Change Name Fee',
                description: 'Change Name Fee is the same as the current one',
            });
            return;
        }
        setChangeNameFee(parseEther(changeNameFee.toString()));
    }, [settings]);

    const onFinishChangeDNAFee = useCallback(({ changeDNAFee }: IFormFields) => {
        if (parseEther(changeDNAFee.toString()) === settings?.changeDNAFee) {
            notification.error({
                message: 'Error in update Change DNA Fee',
                description: 'Change DNA Fee is the same as the current one',
            });
            return;
        }
        setChangeDNAFee(parseEther(changeDNAFee.toString()));
    }, [settings]);

    if (isEmpty(settings)) {
        return <SimpleLoading />;
    }

    return (
        <>
        <Form
            initialValues={initialValues}
            onFinish={onFinishLevelUpFee}
        >
            <Row align="middle">
                <Col span={8}>
                    <FormItemStyled
                        label="Level Up Fee (ether)"
                        name="levelUpFee"
                        rules={[{ required: true, message: 'Please input your "Level Up Fee"!' }]}
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
            onFinish={onFinishChangeNameFee}
        >
            <Row align="middle">
                <Col span={8}>
                    <FormItemStyled
                        label="Change Name Fee (ether)"
                        name="changeNameFee"
                        rules={[{ required: true, message: 'Please input your "Change Name Fee"!' }]}
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
            onFinish={onFinishChangeDNAFee}
        >
            <Row align="middle">
                <Col span={8}>
                    <FormItemStyled
                        label="Change DNA Fee (ether)"
                        name="changeDNAFee"
                        rules={[{ required: true, message: 'Please input your "Change DNA Fee"!' }]}
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

export default HelperForm;