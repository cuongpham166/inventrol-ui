import React, { useState, useEffect, useRef } from 'react';
import { Table, message, Row, Col, Space, Button, Popconfirm, Dropdown } from 'antd';
import CustomModalForm from '../CustomModalForm';
import DetailBrandModal from 'components/Brand/DetailBrandModal';
import { CaretDownOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CustomActionMenu = ({ id, table }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMenuClick = (e) => {
        if (table == 'brand') {
            setIsModalOpen(true);
        }
    };

    const handleModalOk = () => {
        setIsModalOpen(false);
    };
    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const items = [
        {
            label: 'View',
            key: 'view',
            icon: <EyeOutlined />,
        },
        {
            label: 'Edit',
            key: 'edit',
            icon: <EditOutlined />,
        },
        {
            label: 'Delete',
            key: 'delete',
            icon: <DeleteOutlined />,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <Dropdown menu={menuProps} trigger={['click']}>
                <Button type="primary" size={'small'} icon={<CaretDownOutlined />}></Button>
            </Dropdown>
            <DetailBrandModal
                isModalOpen={isModalOpen}
                handleModalOk={handleModalOk}
                handleModalCancel={handleModalCancel}
                dataID={id}
            />
        </>
    );
};

export default CustomActionMenu;
