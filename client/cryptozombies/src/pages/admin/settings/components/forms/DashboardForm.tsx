import { Button, Col, Row } from "antd";
import { useSettingsContext } from "../../context/SettingsContextProvider";
import { formatEther } from "ethers";
import { debounce } from "lodash";

const DashboardForm = () => {
    const { balance, withdraw } = useSettingsContext();

    return (
        <Row align="middle">
            <Col span={4}>
                <p style={{ color: '#FFF' }}>Balance: { formatEther(balance) } ETH</p>
            </Col>
            <Col span={20}>
                <Button disabled={balance <= 0} onClick={debounce(withdraw, 200)}>
                    Withdraw
                </Button>
            </Col>
        </Row>
    )
}

export default DashboardForm;