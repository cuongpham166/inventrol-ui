import React, { useRef } from 'react';
import { Select, Form, Input } from 'antd';

import {
    AppstoreOutlined,
    ShopOutlined,
    BorderlessTableOutlined,
    TagOutlined,
    TagsOutlined,
    SolutionOutlined,
    UserOutlined,
    TableOutlined,
    ShoppingCartOutlined,
    CreditCardOutlined,
    CarOutlined,
    SettingOutlined,
} from '@ant-design/icons';

const { Option } = Select;

export const form = {
    mainLayout: {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 5,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
        layout: 'horizontal',
    },
    tailLayout: {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 5,
            },
        },
    },
    validateMessages: {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    },
};

export const message = {
    top: 50,
    duration: 3,
    maxCount: 3,
    rtl: true,
};

const getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
};

export const sidebarItems = [
    getItem('Dashboard', 'dashboard', <AppstoreOutlined />),

    getItem('Inventory', 'product', <ShopOutlined />),

    getItem('Purchase', 'purchase-overview', <ShoppingCartOutlined />, [
        getItem('Overview', 'purchase', <TableOutlined />),
        getItem('Purchase Shipping', 'purchase/shipping', <CarOutlined />),
    ]),

    getItem('Order', 'order-overview', <ShoppingCartOutlined />, [
        getItem('Overview', 'order', <TableOutlined />),
        getItem('Order Shipping', 'order/shipping', <CarOutlined />),
        getItem('Order Payment', 'order/payment', <CreditCardOutlined />),
    ]),

    getItem('Metadata', 'table', <BorderlessTableOutlined />, [
        getItem('Attribute', 'attribute', <TagOutlined />),
        getItem('Attribute Value', 'attribute-value', <TagsOutlined />),
        getItem('Brand', 'brand', <TagOutlined />),
        getItem('Category', 'category', <TagOutlined />),
        getItem('Discount', 'discount', <TagOutlined />),
        getItem('Subcategory', 'subcategory', <TagsOutlined />),
    ]),

    getItem('Suppliers', 'supplier', <SolutionOutlined />),

    getItem('Customers', 'customer', <UserOutlined />),

    getItem('Settings', 'setting', <SettingOutlined />),
];
