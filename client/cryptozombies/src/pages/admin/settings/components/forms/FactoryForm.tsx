import { Button, Col, Form, notification, Row } from "antd";
import { useSettingsContext } from "../../context/SettingsContextProvider";
import { useCallback, useMemo } from "react";
import { FormItemStyled, InputNumberStyled } from "./styles";
import SimpleLoading from "src/components/loading/SimpleLoading";
import { isEmpty } from "lodash";
import { formatEther, parseEther } from "ethers";

interface IFormFields {
    cooldownTimeAttack: number
    cooldownTimeFeeding: number
    mintFee: string
    totalAttackVictoryToGetReward: number
    totalFedToGetReward: number
}

const FactoryForm = () => {
    const { 
        settings,
        setCooldownTimeAttack,
        setCooldownTimeFeeding,
        setMintFee,
        setTotalAttackVictoryToGetReward,
        setTotalFedToGetReward,
    } = useSettingsContext();

    const {
        cooldownTimeAttack,
        cooldownTimeFeeding,
        mintFee,
        totalAttackVictoryToGetReward,
        totalFedToGetReward,
    } = settings;
    const initialValues = useMemo(() => ({
        cooldownTimeAttack,
        cooldownTimeFeeding: cooldownTimeFeeding,
        mintFee: formatEther(mintFee.toString()),
        totalAttackVictoryToGetReward,
        totalFedToGetReward,
    }), [cooldownTimeAttack, cooldownTimeFeeding, mintFee, totalAttackVictoryToGetReward, totalFedToGetReward]);

    const onFinishCooldownTimeAttack = useCallback(({ cooldownTimeAttack }: IFormFields) => {
        if (cooldownTimeAttack === settings?.cooldownTimeAttack) {
            notification.error({
                message: 'Error in update cooldown time attack',
                description: 'Cooldown time attack is the same as the current one',
            });
            return;
        }
        setCooldownTimeAttack(cooldownTimeAttack);
    }, [settings]);

    const onFinishCooldownTimeFeeding = useCallback(({ cooldownTimeFeeding }: IFormFields) => {
        if (cooldownTimeFeeding === settings?.cooldownTimeFeeding) {
            notification.error({
                message: 'Error in update cooldown time feeding',
                description: 'Cooldown time feeding is the same as the current one',
            });
            return;
        }
        setCooldownTimeFeeding(cooldownTimeFeeding);
    }, [settings]);

    const onFinishMintFee = useCallback(({ mintFee }: IFormFields) => {
        if (parseEther(mintFee.toString()) === settings?.mintFee) {
            notification.error({
                message: 'Error in update cooldown time',
                description: 'Cooldown time is the same as the current one',
            });
            return;
        }
        setMintFee(parseEther(mintFee.toString()));
    }, [settings]);

    const onFinishTotalAttackVictoryToGetReward = useCallback(({ totalAttackVictoryToGetReward }: IFormFields) => {
        if (totalAttackVictoryToGetReward === settings?.totalAttackVictoryToGetReward) {
            notification.error({
                message: 'Error in update cooldown time',
                description: 'Cooldown time is the same as the current one',
            });
            return;
        }
        setTotalAttackVictoryToGetReward(totalAttackVictoryToGetReward);
    }, [settings]);

    const onFinishTotalFedToGetReward = useCallback(({ totalFedToGetReward }: IFormFields) => {
        if (totalFedToGetReward === settings?.totalFedToGetReward) {
            notification.error({
                message: 'Error in update cooldown time',
                description: 'Cooldown time is the same as the current one',
            });
            return;
        }
        setTotalFedToGetReward(totalFedToGetReward);
    }, [settings]);

    if (isEmpty(settings)) {
        return <SimpleLoading />;
    }

    return (
        <>
        <Form
            initialValues={initialValues}
            onFinish={onFinishCooldownTimeAttack}
        >
            <Row align="middle">
                <Col span={8}>
                    <FormItemStyled
                        label="Cooldown Time Attack (in seconds)"
                        name="cooldownTimeAttack"
                        layout="vertical"
                        rules={[{ required: true, message: 'Please input your "cooldown time attack"!' }]}
                        
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
            onFinish={onFinishCooldownTimeFeeding}
        >
            <Row align="middle">
                <Col span={8}>
                    <FormItemStyled
                        label="Cooldown Time Feeding (in seconds)"
                        name="cooldownTimeFeeding"
                        layout="vertical"
                        rules={[{ required: true, message: 'Please input your "cooldown time feeding"!' }]}
                        
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
            onFinish={onFinishMintFee}
        >
            <Row align="middle">
                <Col span={8}>
                    <FormItemStyled
                        label="Mint Fee (ether)"
                        name="mintFee"
                        layout="vertical"
                        rules={[{ required: true, message: 'Please input your "Mint Fee"!' }]}
                        
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
            onFinish={onFinishTotalAttackVictoryToGetReward}
        >
            <Row align="middle">
                <Col span={8}>
                    <FormItemStyled
                        label="Total Attack Victory To Get Reward"
                        name="totalAttackVictoryToGetReward"
                        layout="vertical"
                        rules={[{ required: true, message: 'Please input your "total attack victory to get reward"!' }]}
                        
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
            onFinish={onFinishTotalFedToGetReward}
        >
            <Row align="middle">
                <Col span={8}>
                    <FormItemStyled
                        label="Total Fed To Get Reward"
                        name="totalFedToGetReward"
                        layout="vertical"
                        rules={[{ required: true, message: 'Please input your "total fed to get reward"!' }]}
                        
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

export default FactoryForm;