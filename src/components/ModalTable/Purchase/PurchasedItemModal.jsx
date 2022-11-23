import React, { useState } from 'react';
import { Button, Modal, List, Typography, Tag, Space, Table, Divider, Col, Row } from 'antd';
import { CodeSandboxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
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
    },
    {
        title: 'Listing Price',
        dataIndex: 'product',
        key: 'product',
        align: 'center',
        render: (product) => <Text>{product.listingPrice}</Text>,
    },
    {
        title: 'Item Cost',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        render: (text, record, index) => <Text>{record.product.listingPrice * record.quantity}</Text>,
    },
];

const PurchasedItemModal = ({ data }) => {
    const [tableData, setTableData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    let purchasedItems = data.purchaseItem;
    let totalCost = data.total;
    let purchaseNotice = data.notice;

    let status = data.purchaseshipping.status;
    let tagColor = status === 'Completed' ? 'green' : 'yellow';
    if (status == 'Cancelled' || status == 'Returned') {
        tagColor = 'red';
    }
    const showModal = () => {
        setTableData(purchasedItems);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button onClick={showModal} icon={<CodeSandboxOutlined />}></Button>
            <Modal
                title={
                    <Space>
                        <Link to={'/purchase/' + data.id}>Purchase #{data.id}</Link>
                        <Tag color={tagColor}>{status}</Tag>
                    </Space>
                }
                open={isModalOpen}
                onOk={handleOk}
                width="600"
                okText={'Close'}
                closable={false}
                centered={true}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Table dataSource={tableData} columns={itemTableColumns} rowKey="id" />
                <Divider />
                <Row justify="space-between">
                    <Col span={12}>
                        <Title level={5}>Purchase Note</Title>
                        <Text>{purchaseNotice}</Text>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Title level={5}>Total Cost: {totalCost}€</Title>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default PurchasedItemModal;
