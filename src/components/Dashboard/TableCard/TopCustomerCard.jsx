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
        title: 'Orders',
        dataIndex: 'order',
        key: 'order',
    },
];
const TopCustomerCard = (props) => {
    return (
        <Card bordered={false} title="Top Customers">
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
    );
};

export default TopCustomerCard;
