import { useMemo } from "react";
import { Image, Row, Spin, Table } from "antd";
import { useRankingContext } from "../context/RankingContextProvider";
import { isEmpty } from "lodash";
import { addressFormat } from "@/utils/formatter";
import { useAuthContext } from "@/context/auth/AuthContextProvider";
import SimpleLoading from "@/components/loading/SimpleLoading";

const RankingTable = () => {
    const { address } = useAuthContext();
    const { ranking } = useRankingContext();    
    const columns = useMemo(() => [
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            render: (position: number) => `${position + 1}º`,
            width: 150,
        },
        {
            title: 'Account',
            dataIndex: 'account',
            key: 'account',
            render: (value: string) => {
                return (
                    <Row justify="start" align="middle" style={{ gap: 10 }}>
                        <Image 
                            src={`https://robohash.org/${value}?set=set2`} 
                            placeholder={<Spin spinning />} 
                            preview={false}
                            width={50}
                        />
                        {address === value ?
                        <strong>{ addressFormat(value) } (You)</strong> :
                        <span>{ addressFormat(value) }</span>
                        }
                    </Row>
                )
            },
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Win',
            dataIndex: 'winCount',
            key: 'winCount',
        },
        {
            title: 'Loss',
            dataIndex: 'lossCount',
            key: 'lossCount',
        },
        {
            title: 'Zombie Count',
            dataIndex: 'zombieCount',
            key: 'zombieCount',
        },
    ], [address]);

    if (isEmpty(ranking)) {
        return <SimpleLoading />;
    }

    return (
        <Row style={{ width: '100%' }}>
            <Table 
                columns={columns}
                dataSource={ranking}
                virtual
                pagination={false}
                scroll={{ x: 700, y: 0 }}
            />
        </Row>
    );
}

export default RankingTable;
