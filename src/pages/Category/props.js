import React, { useState, useEffect } from 'react';

import { Form, Input, Popover, Tag, Select, Typography, Card, Button, Modal, Tooltip, Descriptions } from 'antd';
import { Link } from 'react-router-dom';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';

import { EyeOutlined, SaveOutlined, ExpandAltOutlined, EditOutlined } from '@ant-design/icons';
import * as service from '../../api/services';
import { $ } from 'moneysafe';
import * as layoutConfig from 'utils/config/layout';

import DateTimeFormatter from 'components/common/CustomFormatter/DateTimeFormatter';

import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';

const { Option } = Select;
const { Title, Text } = Typography;
export const initialFormValues = {
    notice: '',
    subategory: [],
};

export const CustomFormMainItems = () => {
    return (
        <>
            <Form.Item
                label="Name"
                name="name"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Name" />
            </Form.Item>

            <Form.Item label="Notice" name="notice">
                <Input.TextArea allowClear showCount placeholder="Notice" />
            </Form.Item>
        </>
    );
};

export const categoryTableColumns = [
    {
        title: 'Id',
        key: 'index',
        render: (text, record, index) => record.id,
        width: 50,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <CustomDataTableCell data={record} type="category" />,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Created on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        align: 'right',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
        sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
    },
];

export const categoryProductTableColumns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
        width: 60,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={'/product/' + record.id}>{text}</Link>,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
        render: (brand) => <Link to={'/brand/' + brand.id}>{brand.name}</Link>,
    },
    {
        title: 'Retail Price',
        dataIndex: 'retailPrice',
        key: 'retailPrice',
        render: (retailPrice) => <Text>{$(retailPrice).toFixed()} </Text>,
    },
    {
        title: 'Listing Price',
        dataIndex: 'listingPrice',
        key: 'listingPrice',
        render: (listingPrice) => <Text>{$(listingPrice).toFixed()} </Text>,
    },
    {
        title: 'Subcategory',
        dataIndex: 'subcategory',
        key: 'subcategory',
        render: (subcategory) => (
            <Link to={'/subcategory/' + subcategory.id}>
                <Tag color={subcategory.tagColor}>{subcategory.name}</Tag>
            </Link>
        ),
    },

    {
        title: 'Status',
        dataIndex: 'productstock',
        key: 'productstock',
        render: (productstock) => {
            let tagColor = productstock.stockStatus === 'Out of Stock' ? 'red' : 'yellow';
            if (productstock.stockStatus === 'In Stock') {
                tagColor = 'green';
            }
            return <Tag color={tagColor}>{productstock.stockStatus}</Tag>;
        },
    },
];
