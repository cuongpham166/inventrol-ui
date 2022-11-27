import React, { useState } from 'react';
import { Button, Modal, List, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowsAltOutlined } from '@ant-design/icons';
const { Text } = Typography;

const PurchaseShippingModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button size="small" onClick={showModal} icon={<ArrowsAltOutlined />}></Button>
            <Modal
                title={props.status + ' Purchase'}
                open={isModalOpen}
                onOk={handleOk}
                okText={'Close'}
                closable={false}
                centered={true}
                cancelButtonProps={{ style: { display: 'none' } }}
            ></Modal>
        </>
    );
};

export default PurchaseShippingModal;
