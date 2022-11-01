import React, { useState } from 'react';
import { Popover, Tag, Button, Modal, Table } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';

const NoticeModal = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal} icon={<EyeOutlined />}></Button>
            <Modal
                title="Notice"
                open={isModalOpen}
                onOk={handleOk}
                okText={'Close'}
                closable={false}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <p>{data}</p>
            </Modal>
        </>
    );
};

export default NoticeModal;
