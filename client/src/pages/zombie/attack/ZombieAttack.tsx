import { Breadcrumb, Col, PaginationProps, Row } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useZombieAttackContext } from './context/ZombieAttackContextProvider';
import { map } from 'lodash';
import ZombieEnemy from './components/ZombieEnemy';
import ZombieCard from 'src/components/zombie/ZombieCard';
import { IZombie } from 'src/store/interface/zombie/IZombie';
import { useNavigate } from 'react-router';
import { Paths } from 'src/router/RouteConsts';
import CZBPagination from 'src/components/pagination/CZBPagination';

const ZombieAttack: React.FC = () => {
    // const { address } = useAuthContext();
    // const { addressEnemie } = useParams();
    const { zombie, zombies, pageSize, balanceOfEnemie, getZombiesByOwnerMapped } = useZombieAttackContext();
    // const chatRef = useRef<IChatRef>(null);
    const navigate = useNavigate();
    const breadcrumbItems = useMemo(() => [
        {
            title: <a onClick={() => navigate(Paths.HOME)}>Play to earn</a>,
        },
        {
            title: <a onClick={() => navigate(-1)}>Battle</a>,
        },
        {
            title: 'Attack',
        },
    ], []);

    // const showChat = useCallback(() => {
    //     chatRef.current?.showChat();
    // }, [chatRef])

    const onChange: PaginationProps['onChange'] = useCallback((page: number) => {
        getZombiesByOwnerMapped(page);
    }, []);

    return (
        <>
        <Breadcrumb items={breadcrumbItems} />
        <Row justify="space-between" align="middle">
            <h1 style={{ color: '#b6a764' }}>Choose a zombie to fight {zombie?.name}</h1>
            {/* <Button onClick={showChat}>
                Battle Chat
            </Button> */}
        </Row>
        <Row>
            <Col span={4}>
                <ZombieCard zombie={zombie as IZombie} />
            </Col>
            <Col span={20}>
                {zombies?.length ?
                <Row gutter={[8, 8]}>
                { map(zombies, zomb => (
                    <Col key={zomb.id}>
                        <ZombieEnemy zombie={zomb} />
                    </Col>
                )) }
                </Row> :
                <Row justify="center" align="middle">
                    <p>Loading enemies...</p>
                </Row>
                }
                <CZBPagination pageSize={pageSize} total={balanceOfEnemie} onChange={onChange} />
            </Col>
        </Row>
        {/* <Chat ref={chatRef} from={address} to={addressEnemie || ''} /> */}
        </>
    )
}

export default ZombieAttack;
