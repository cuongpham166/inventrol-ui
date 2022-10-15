import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, Select, Tag, Popover } from 'antd';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';
import { EyeOutlined } from '@ant-design/icons';

import * as service from '../../api/services';
const { Option } = Select;

export const initialFormValues = {
    notice: '',
    tagColor: '#7a3db8',
};

export const CustomFormMainItems = () => {
    const [categoryDataSource, setCategpryDataSource] = useState([]);
    const [blockPickerColor, setBlockPickerColor] = useState('#7a3db8');

    const onChangeColor = (color) => {
        setBlockPickerColor(color.hex);
    };
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

            <Form.Item
                name="category"
                label="Category"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select placeholder="Please select a category">
                    {categoryDataSource.map((option) => (
                        <Option key={option.id} value={option.name}>
                            {option.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Tag Color"
                name="tagColor"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Colorpicker
                    popup
                    blockStyles={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                    }}
                    picker={'SketchPicker'}
                    onChange={onChangeColor}
                    value={blockPickerColor}
                />
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
        render: (text, record) => <Link to={'/subcategory/' + record.id}>{text}</Link>,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (category) => (
            <Link to={'/category/' + category.id}>
                <Tag color={category.tagColor}>{category.name}</Tag>
            </Link>
        ),
    },
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: '120px',
    },
    {
        title: 'Updated Date',
        dataIndex: 'updatedDate',
        key: 'updatedDate',
        width: '130px',
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
        width: '50px',
        align: 'center',
        render: (notice) => (
            <Popover content={notice} title="Notice" placement="bottom">
                <EyeOutlined />
            </Popover>
        ),
    },
];
