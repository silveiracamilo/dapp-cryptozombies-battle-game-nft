import { Col, PaginationProps, Row } from 'antd';
import React, { useCallback } from 'react';
import { useMarketplaceContext } from './context/MarketplaceContextProvider';
import { map } from 'lodash';
import ZombieSale from './components/ZombieSale';
import CZBPagination from 'src/components/pagination/CZBPagination';

const Marketplace: React.FC = () => {
    const { total, pageSize, allZombiesInShop, getZombiesInShop } = useMarketplaceContext();

    const onChange: PaginationProps['onChange'] = useCallback((page: number) => {
        getZombiesInShop(page);
    }, []);

    return (
        <>
        <Row>
            <h1 style={{ color: '#b6a764' }}>Marketplace</h1>
        </Row>
        <Row style={{ width: '100%' }} gutter={[16, 16]}>
            { map(allZombiesInShop, zombieSale => (
                <Col span={4} key={zombieSale.zombieId}>
                    <ZombieSale zombieSale={zombieSale} />
                </Col>
            )) }
        </Row>
        <CZBPagination pageSize={pageSize} total={total} onChange={onChange} />
        </>
    )
}

export default Marketplace;