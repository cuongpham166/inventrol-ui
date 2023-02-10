import React from 'react';
import { Card, Table } from 'antd';
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        order: 32,
    },
    {
        key: '2',
        name: 'John',
        order: 42,
    },
    {
        key: '3',
        name: 'Mike',
        order: 32,
    },
];

const columns = [
    { title: '#', dataIndex: 'key', key: 'key' },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Qty',
        dataIndex: 'order',
        key: 'order',
    },
];

const TopOrderedProductCard = (props) => {
    return (
        <Card bordered={false} title="Top Ordered Products">
            <Table dataSource={dataSource} columns={columns} pagination={false} size={'small'} bordered={true} />
        </Card>
    );
};

export default TopOrderedProductCard;
