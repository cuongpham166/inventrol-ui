import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, message, Row, Col, Space, Button, Popconfirm, Dropdown } from 'antd';
import {
    CaretDownOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    MailOutlined,
    ShoppingCartOutlined,
    CodeSandboxOutlined,
} from '@ant-design/icons';

import SupplierEmailModal from '../SupplierModal/SupplierEmailModal';
import SupplierPurchaseModal from '../SupplierModal/SupplierPurchaseModal';
import SupplierProductModal from '../SupplierModal/SupplierProductModal';

const SupplierActionMenu = ({ id }) => {
    const navigate = useNavigate();

    const [isClicked, setIsClicked] = useState(-1);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isViewPurchaseModalOpen, setIsViewPurchaseModalOpen] = useState(false);
    const [isViewProductModalOpen, setIsViewProductModalOpen] = useState(false);

    const handleMenuClick = (e) => {
        switch (e.key) {
            case 'viewDetail':
                navigate(`/supplier/${id}`);
                setIsClicked(id);
                break;
            case 'makePurchase':
                navigate(`/supplier/${id}/purchase/add`);
                setIsClicked(id);
                break;
            case 'sendEmail':
                setIsEmailModalOpen(true);
                setIsClicked(id);
                break;
            case 'viewPurchase':
                setIsViewPurchaseModalOpen(true);
                setIsClicked(id);
                break;
            case 'viewProducts':
                setIsViewProductModalOpen(true);
                setIsClicked(id);
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
            label: 'View Purchases',
            key: 'viewPurchase',
            icon: <EyeOutlined />,
        },
        {
            label: 'View Products',
            key: 'viewProducts',
            icon: <CodeSandboxOutlined />,
        },
        {
            label: 'Send Email',
            key: 'sendEmail',
            icon: <MailOutlined />,
        },
        {
            label: 'Make Purchase',
            key: 'makePurchase',
            icon: <ShoppingCartOutlined />,
        },
        {
            label: 'Update Supplier',
            key: 'edit',
            icon: <EditOutlined />,
        },
        {
            label: 'Delete Supplier',
            key: 'delete',
            icon: <DeleteOutlined />,
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const handleEmailModalOk = () => {
        setIsEmailModalOpen(false);
    };
    const handleViewPurchaseModalOk = () => {
        setIsViewPurchaseModalOpen(false);
    };
    const handleViewProductModalOk = () => {
        setIsViewProductModalOpen(false);
    };

    return (
        <>
            <Dropdown menu={menuProps} trigger={['click']}>
                <Button type="primary" size={'small'} icon={<CaretDownOutlined />}></Button>
            </Dropdown>
            {id == isClicked ? (
                <>
                    <SupplierEmailModal
                        isEmailModalOpen={isEmailModalOpen}
                        handleEmailModalOk={handleEmailModalOk}
                        dataID={id}
                    />
                    <SupplierPurchaseModal
                        isViewPurchaseModalOpen={isViewPurchaseModalOpen}
                        handleViewPurchaseModalOk={handleViewPurchaseModalOk}
                        dataID={id}
                    />
                    <SupplierProductModal
                        isViewProductModalOpen={isViewProductModalOpen}
                        handleViewProductModalOk={handleViewProductModalOk}
                        dataID={id}
                    />
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default SupplierActionMenu;
