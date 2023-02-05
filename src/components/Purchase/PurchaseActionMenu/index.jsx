import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, message, Row, Col, Space, Button, Popconfirm, Dropdown } from 'antd';
import {
    CaretDownOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    CodeSandboxOutlined,
    CarOutlined,
} from '@ant-design/icons';

import PurchaseShippingModal from '../PurchaseModal/PurchaseShippingModal';
import PurchaseItemModal from '../PurchaseModal/PurchaseItemModal';

const PurchaseActionMenu = ({ id }) => {
    const navigate = useNavigate();

    const [isClicked, setIsClicked] = useState(-1);

    const [isViewShippingModalOpen, setIsViewShippingModalOpen] = useState(false);
    const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);

    const handleMenuClick = (e) => {
        switch (e.key) {
            case 'viewDetail':
                navigate(`/purchase/${id}`);
                setIsClicked(id);
                break;
            case 'viewShipping':
                setIsClicked(id);
                setIsViewShippingModalOpen(true);
                break;
            case 'viewItems':
                setIsClicked(id);
                setIsViewItemModalOpen(true);
                break;
            default:
                break;
        }
    };

    const items = [
        {
            label: 'View Detail',
            key: 'viewDetail',
            icon: <EyeOutlined />,
        },
        {
            label: 'View Purchased Items',
            key: 'viewItems',
            icon: <CodeSandboxOutlined />,
        },
        {
            label: 'View Shipping Information',
            key: 'viewShipping',
            icon: <CarOutlined />,
        },
        {
            label: 'Update Purchase',
            key: 'edit',
            icon: <EditOutlined />,
        },
        {
            label: 'Delete Purchase',
            key: 'delete',
            icon: <DeleteOutlined />,
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const handleViewShippingModalOk = () => {
        setIsViewShippingModalOpen(false);
    };

    const handleViewItemModalOk = () => {
        setIsViewItemModalOpen(false);
    };

    return (
        <>
            <Dropdown menu={menuProps} trigger={['click']}>
                <Button type="primary" size={'small'} icon={<CaretDownOutlined />}></Button>
            </Dropdown>
            {id == isClicked ? (
                <>
                    <PurchaseShippingModal
                        isViewShippingModalOpen={isViewShippingModalOpen}
                        handleViewShippingModalOk={handleViewShippingModalOk}
                        dataID={id}
                    />
                    <PurchaseItemModal
                        isViewItemModalOpen={isViewItemModalOpen}
                        handleViewItemModalOk={handleViewItemModalOk}
                        dataID={id}
                    />
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default PurchaseActionMenu;
