import React, { useState, useEffect } from 'react';
import { Button, Modal, List, Typography, Tag, Space, Table, Divider, Col, Row } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import * as service from '../../../../api/services';
import { Link } from 'react-router-dom';
import { $ } from 'moneysafe';
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
const SupplierPurchaseItemModal = ({ dataID }) => {
    const [tableData, setTableData] = useState();

    const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);

    const [purchasedItems, setPurchasedItems] = useState();
    const [totalCost, setTotalCost] = useState();
    const [purchaseNotice, setPurchaseNotice] = useState();

    const getPurchaseItems = async (dataID) => {
        try {
            const result = await service.getById('purchase', dataID);
            setPurchasedItems(result.purchaseItem);
            setTotalCost(result.total);
            setPurchaseNotice(result.notice);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPurchaseItems(dataID);
    }, []);

    /*let status = data.purchaseshipping.status;
    let tagColor = status === 'Completed' ? 'green' : 'yellow';
    if (status == 'Cancelled' || status == 'Returned') {
        tagColor = 'red';
    }*/
    const showModal = () => {
        setIsViewItemModalOpen(true);
    };

    const handleViewItemModalOk = () => {
        setIsViewItemModalOpen(false);
    };
    return (
        <>
            <Button type="primary" size={'small'} icon={<EyeOutlined />} onClick={showModal}></Button>
            <Modal
                /*title={
                    <Space>
                        <Link to={'/purchase/' + data.id}>Purchase #{data.id}</Link>
                        <Tag color={tagColor}>{status}</Tag>
                    </Space>
                }*/
                open={isViewItemModalOpen}
                onOk={handleViewItemModalOk}
                okText={'Close'}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={false}
                width={900}
            >
                <Table dataSource={purchasedItems} columns={itemTableColumns} rowKey="id" />
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

export default SupplierPurchaseItemModal;
