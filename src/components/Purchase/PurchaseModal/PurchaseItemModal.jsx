import React from 'react';
import { Modal, Typography, Table, Divider, Col, Row, Skeleton, Result } from 'antd';
import { Link } from 'react-router-dom';
import { $ } from 'moneysafe';

import { useGetPurchaseQuery } from 'features/api/apiSlice';

const { Text, Title } = Typography;
const itemTableColumns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
        width: 60,
    },
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        render: (product) => <Link to={'/product/' + product.id}>{product.name}</Link>,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        align: 'center',
        key: 'quantity',
        align: 'right',
    },
    {
        title: 'Listing Price',
        dataIndex: 'product',
        key: 'product',
        align: 'right',
        render: (product) => <Text>{$(product.listingPrice).toFixed()}</Text>,
    },
    {
        title: 'Item Cost',
        dataIndex: 'index',
        key: 'index',
        align: 'right',
        render: (text, record, index) => <Text>{$(record.product.listingPrice * record.quantity).toFixed()}</Text>,
    },
];

const PurchaseItemModal = ({ isViewItemModalOpen, handleViewItemModalOk, dataID }) => {
    let content;
    const { data: purchase, isLoading, isSuccess, isError, error } = useGetPurchaseQuery(dataID);

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <>
                <Table dataSource={purchase.purchaseItem} columns={itemTableColumns} rowKey="id" />
                <Divider />
                <Row justify="space-between">
                    <Col span={12}>
                        <Title level={5}>Purchase Note</Title>
                        <Text>{purchase.notice}</Text>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Title level={5}>Total Cost: {purchase.total}€</Title>
                    </Col>
                </Row>
            </>
        );
    } else if (isError) {
        let errorStatus = `[${error.status}] - ${error.error}`;
        content = <Result status="warning" title={errorStatus} />;
    }

    return (
        <>
            <Modal
                title="Purchased Items"
                open={isViewItemModalOpen}
                onOk={handleViewItemModalOk}
                okText={'Close'}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={false}
                width={900}
            >
                {content}
            </Modal>
        </>
    );
};

export default PurchaseItemModal;
