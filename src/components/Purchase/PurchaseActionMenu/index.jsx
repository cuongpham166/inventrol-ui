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
    FilePdfOutlined,
} from '@ant-design/icons';

import PurchaseShippingModal from '../PurchaseModal/PurchaseShippingModal';
import PurchaseItemModal from '../PurchaseModal/PurchaseItemModal';
import PurchaseOrderReportModal from '../PurchaseModal/PurchaseOrderReportModal';

const PurchaseActionMenu = ({ id }) => {
    const navigate = useNavigate();

    const [isClicked, setIsClicked] = useState(-1);

    const [isViewShippingModalOpen, setIsViewShippingModalOpen] = useState(false);
    const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
    const [isPurchaseOrderReportModalOpen, setIsPurchaseOrderReportModalOpen] = useState(false);

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
            case 'exportPO':
                setIsClicked(id);
                setIsPurchaseOrderReportModalOpen(true);
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
        {
            label: 'Export PO Report',
            key: 'exportPO',
            icon: <FilePdfOutlined />,
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

    const handlePurchaseOrderReportModalOk = () => {
        setIsPurchaseOrderReportModalOpen(false);
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
                    <PurchaseOrderReportModal
                        isPurchaseOrderReportModalOpen={isPurchaseOrderReportModalOpen}
                        handlePurchaseOrderReportModalOk={handlePurchaseOrderReportModalOk}
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
