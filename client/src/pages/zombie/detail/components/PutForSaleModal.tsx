import { Col, ConfigProvider, InputNumber, Modal, notification, Row, Tooltip } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useZombieDetailContext } from "../context/ZombieDetailContextProvider";
import { debounce } from "lodash";
import { Zombie } from "@/components/zombie/Zombie";
import { formatEther, parseEther } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

interface IPutForSaleModal {
    showPutForSaleModal: boolean;
    setShowPutForSaleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PutForSaleModal: React.FC<IPutForSaleModal> = ({ showPutForSaleModal, setShowPutForSaleModal }) => {
    const { zombie, fees, saleZombie, loading } = useZombieDetailContext();
    const minPrice = useMemo(() => {
        const tax = +formatEther(fees.tax);
        const mPrice = +formatEther(fees.minPrice);
        return tax + mPrice;
    }, [fees]);
    const [price, setPrice] = useState<number>(0);

    const handleOk = useCallback(async () => {
        if (price <= minPrice) {
            notification.error({
                message: 'Error in put for sale',
                description: `Your price is too low, min is ${minPrice}`,
            });
            return;
        }

        await saleZombie(zombie?.id as number, parseEther(price.toString()));
        handleCancel();
    }, [price]);

    const handleCancel = useCallback(() => {
        setShowPutForSaleModal(false);
    }, []);

    return (
        <Modal width={1000} title="Put your zombie for sale" open={showPutForSaleModal} onOk={debounce(handleOk, 200)} onCancel={handleCancel} loading={loading}>
            <p>Your zombie: {zombie?.id} # {zombie?.name}</p>
            <Row align="middle">
                <Col span={8}>
                    <Zombie dna={zombie?.dna || ''} />
                </Col>
                <Col span={16}>
                    <p style={{ color: '#000' }}>
                        Min price: {minPrice}
                        &nbsp;&nbsp;
                        <Tooltip 
                            title={<>
                                <p><i>{formatEther(fees.tax)} + {formatEther(fees.minPrice)} = {minPrice}</i></p>
                                <p><i>tax + min = min price</i></p>
                            </>}
                        >
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Tooltip>
                    </p>
                    
                    
                    <ConfigProvider
                        theme={{
                            components: {
                                InputNumber: {
                                    fontSize: 70,
                                    lineHeight: 1.1
                                },
                            },
                        }}
                    >
                        <InputNumber 
                            placeholder="Price" 
                            value={price} 
                            min={minPrice}
                            onChange={e => setPrice(e || minPrice)} 
                            style={{ height: '80px', width: '100%' }}
                            
                        />
                    </ConfigProvider>
                </Col>
            </Row>
        </Modal>
    );
}

export default PutForSaleModal;
