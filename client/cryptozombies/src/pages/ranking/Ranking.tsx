import { Row } from 'antd';
import React from 'react';
import RankingTable from './components/RankingTable';

const Ranking: React.FC = () => {
    return (
        <Row>
            <Row style={{ width: '100%' }}>
                <h1>Ranking</h1>
            </Row>
            <Row>
                <RankingTable />
            </Row>
        </Row>
    )
}

export default Ranking;