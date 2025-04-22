import { Col, Row } from 'antd';
import React from 'react';
import { useMarketplaceContext } from './context/MarketplaceContextProvider';
import { map } from 'lodash';
import ZombieSale from './components/ZombieSale';

const Marketplace: React.FC = () => {
    const { allZombiesInShop } = useMarketplaceContext();
    return (
        <Row style={{ width: '100%' }}>
            <Row style={{ width: '100%' }}>
                <h1 style={{ color: '#b6a764' }}>Marketplace</h1>
            </Row>
            <Row style={{ width: '100%' }} gutter={[16, 16]}>
                { map(allZombiesInShop, zombieSale => (
                    <Col span={4} key={zombieSale.zombieId}>
                        <ZombieSale zombieSale={zombieSale} />
                    </Col>
                )) }
            </Row>
        </Row>
    )
}

export default Marketplace;