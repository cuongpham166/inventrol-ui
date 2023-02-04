import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Form, Input, Select, Tag, Popover, Space, Button, Card, Typography, Tooltip, Descriptions } from 'antd';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';
import { EyeOutlined, EditOutlined, DeleteOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';

import * as service from '../../api/services';
import * as layoutConfig from 'utils/config/layout';

import DateTimeFormatter from 'components/common/DateTimeFormatter';

import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';
import { $ } from 'moneysafe';
const { Option } = Select;
const { Title, Text } = Typography;

export const initialFormValues = {
    notice: '',
};

export const CustomFormMainItems = () => {
    const [categoryDataSource, setCategpryDataSource] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        const result = await service.getAll('category');
        setCategpryDataSource(result);
    };
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

            <Form.Item label="Category">
                <Input.Group compact>
                    <Form.Item
                        name="category"
                        label="Category"
                        hasFeedback
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select placeholder="Please select a category" style={{ width: '65%' }}>
                            {categoryDataSource.map((option) => (
                                <Option key={option.id} value={option.name}>
                                    {option.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item noStyle>
                        <Button
                            style={{ width: '35%' }}
                            icon={<PlusOutlined />}
                            type={'primary'}
                            onClick={() => {
                                navigate('/category/add');
                            }}
                        >
                            New Category
                        </Button>
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item label="Notice" name="notice">
                <Input.TextArea allowClear showCount placeholder="Notice" />
            </Form.Item>
        </>
    );
};

export const subcategoryTableColumns = [
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
        render: (text, record) => <CustomDataTableCell data={record} type="subcategory" />,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (category) => <Link to={'/category/' + category.id}>{category.name}</Link>,
    },
    {
        title: 'Created on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        align: 'right',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
    },
];

export const subcategoryProductTableColumns = [
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
