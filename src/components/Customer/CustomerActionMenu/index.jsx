import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, message, Row, Col, Space, Button, Popconfirm, Dropdown } from 'antd';
import {
    CaretDownOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    SolutionOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';

const CustomerActionMenu = ({ id }) => {
    const navigate = useNavigate();

    const [isClicked, setIsClicked] = useState(-1);

    const handleMenuClick = (e) => {
        switch (e.key) {
            case 'viewDetail':
                setIsClicked(id);
                break;
            case 'viewAddress':
                navigate(`/customer/${id}/address`);
                setIsClicked(id);
                break;
            case 'placeOrder':
                navigate(`/customer/${id}/order/add`);
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
            label: 'View Address Book',
            key: 'viewAddress',
            icon: <SolutionOutlined />,
        },
        {
            label: 'Place Order',
            key: 'placeOrder',
            icon: <ShoppingCartOutlined />,
        },
        {
            label: 'Update Customer',
            key: 'edit',
            icon: <EditOutlined />,
        },
        {
            label: 'Delete Customer',
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
            {id == isClicked ? <></> : <></>}
        </>
    );
};

export default CustomerActionMenu;
