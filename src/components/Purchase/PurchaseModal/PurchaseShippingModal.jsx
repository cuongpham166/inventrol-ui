import React, { useState, useEffect } from 'react';
import { Button, Modal, List, Typography, Tag, Space, Table, Divider, Col, Row } from 'antd';
import { CarOutlined } from '@ant-design/icons';

import * as service from '../../../api/services';

const { Text } = Typography;
const PurchaseShippingModal = ({ isViewShippingModalOpen, handleViewShippingModalOk, dataID }) => {
    const [shippingService, setShippingService] = useState(null);
    const [shippingTracking, setShippingTracking] = useState(null);

    const getDetailPurchaseShipping = async (dataID) => {
        try {
            const result = await service.getById('purchase', dataID);
            setShippingService(result.purchaseshipping.service);
            setShippingTracking(result.purchaseshipping.trackingNumber);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDetailPurchaseShipping(dataID);
    }, []);

    let listData = [
        {
            title: 'Service',
            text: shippingService,
        },
        {
            title: 'Tracking Number',
            text: shippingTracking,
        },
    ];

    return (
        <>
            <Modal
                title="Shipping Information"
                open={isViewShippingModalOpen}
                onOk={handleViewShippingModalOk}
                okText={'Close'}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={false}
            >
                <List
                    dataSource={listData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta title={item.title} key={index} />
                            <Text>{item.text}</Text>
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
};

export default PurchaseShippingModal;
