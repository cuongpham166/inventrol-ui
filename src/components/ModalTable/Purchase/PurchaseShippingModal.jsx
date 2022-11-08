import React, { useState } from 'react';
import { Button, Modal, List, Typography, Tag, Space, Table, Divider, Col, Row } from 'antd';
import { CarOutlined } from '@ant-design/icons';
const { Text } = Typography;
const PurchaseShippingModal = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    let listData = [
        {
            title: 'Service',
            text: data.courier,
        },
        {
            title: 'Tracking Number',
            text: data.trackingNumber,
        },
    ];

    return (
        <>
            <Button onClick={showModal} icon={<CarOutlined />}></Button>
            <Modal
                title="Shipping Information"
                open={isModalOpen}
                onOk={handleOk}
                okText={'Close'}
                closable={false}
                centered={true}
                cancelButtonProps={{ style: { display: 'none' } }}
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
