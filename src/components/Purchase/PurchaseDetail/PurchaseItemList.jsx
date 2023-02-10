import React, { useMemo } from 'react';
import { Card, Table, Typography, Space, Divider, Col, Row, Tag } from 'antd';
import { $ } from 'moneysafe';
import { $$, subtractPercent, addPercent } from 'moneysafe/ledger';
const { Text, Title } = Typography;
const PurchaseItemList = ({ data }) => {
    const sortedPurchaseItems = useMemo(() => {
        const sortedPurchaseItems = data.purchaseItem.slice();
        sortedPurchaseItems.sort((a, b) => a.product.id - b.product.id);
        return sortedPurchaseItems;
    }, [data.purchaseItem]);

    const purchaseItemsTableColumns = [
        {
            title: 'Name',
            dataIndex: 'product',
            key: 'product',
            render: (product) => (
                <Space direction="vertical" size={0}>
                    <Text>{product.brand.name}</Text>
                    <Text strong>{product.name}</Text>
                    <Text>{product.barcode}</Text>
                </Space>
            ),
        },
        {
            title: 'Subcategory',
            dataIndex: 'product',
            key: 'product',
            render: (product) => <Tag color={product.subcategory.tagColor}>{product.subcategory.name}</Tag>,
        },
        {
            title: 'Qty',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Unit Price',
            dataIndex: 'product',
            key: 'product',
            align: 'center',
            render: (product) => <Text>{$(product.listingPrice).toFixed()} </Text>,
        },
        {
            title: 'Total',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            render: (text, record, index) => <Text>{$(record.product.listingPrice * record.quantity).toFixed()} </Text>,
        },
    ];

    return (
        <Card title={<Title level={5}>Purchased Items</Title>} bordered={false} style={{ height: '100%' }}>
            <Table columns={purchaseItemsTableColumns} dataSource={sortedPurchaseItems} rowKey="id" />
            <Divider />
            <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                <Col span={19}>
                    <Space direction="vertical" size={0}>
                        <Title level={5}>Purchase Note</Title>
                        <Text>{data.notice}</Text>
                    </Space>
                </Col>
                <Col span={5}>
                    <Row justify="space-between" align="middle">
                        <Title level={5} style={{ marginBottom: '0' }}>
                            Total:
                        </Title>
                        <Text strong>{$(data.total).toFixed()}€</Text>
                    </Row>
                    <Row justify="space-between" align="middle" style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <Title level={5} style={{ marginBottom: '0' }}>
                            Payment Method:
                        </Title>
                        <Text strong>{data.paymentType}</Text>
                    </Row>
                    <Row justify="space-between" align="middle">
                        <Title level={5} style={{ marginBottom: '0' }}>
                            Number of items:
                        </Title>
                        <Text strong>{data.numberOfItems}</Text>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default PurchaseItemList;
