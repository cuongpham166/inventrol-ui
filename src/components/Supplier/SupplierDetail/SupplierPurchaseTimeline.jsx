import React, { useMemo } from 'react';
import { Card, Typography, Timeline, Button, Space, Result, Skeleton } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

import PurchaseShippingCard from 'components/Purchase/PurchaseCard/PurchaseShippingCard';

import { useGetSupplierPurchasesQuery } from 'features/api/apiSlice';

import { Link } from 'react-router-dom';

import * as dayjs from 'dayjs';

const { Title, Text } = Typography;

const SupplierPurchaseTimeline = ({ supplierId }) => {
    let content;
    const { data: purchases = [], isLoading, isSuccess, isError, error } = useGetSupplierPurchasesQuery(supplierId);

    const sortedPurchases = useMemo(() => {
        let sortedPurchases = purchases.slice();
        sortedPurchases.sort((a, b) => b.id - a.id);
        if (sortedPurchases.length > 0) {
            sortedPurchases = sortedPurchases.slice(0, 5);
        }
        return sortedPurchases;
    }, [purchases]);

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <>
                <Timeline className="timelinelist">
                    {sortedPurchases.map((data, index) => (
                        <Timeline.Item key={index}>
                            <Space direction="vertical">
                                <Space>
                                    <Text strong>New Purchase #{data.id}</Text>
                                    <PurchaseShippingCard status={data.purchaseshipping.status} />
                                </Space>

                                <Text type="secondary">{dayjs(data.createdOn).format('LLL')}</Text>
                            </Space>
                        </Timeline.Item>
                    ))}
                </Timeline>
                <Link to={'/supplier/' + supplierId + '/purchase'}>
                    <Button type="primary" className="width-100" style={{ marginTop: '20px' }}>
                        {<UnorderedListOutlined />} See All Purchases
                    </Button>
                </Link>
            </>
        );
    } else if (isError) {
        let errorStatus = `[${error.status}] - ${error.error}`;
        content = <Result status="warning" title={errorStatus} />;
    }

    return (
        <Card bordered={false} title="Latest Purchases">
            {content}
        </Card>
    );
};

export default SupplierPurchaseTimeline;
