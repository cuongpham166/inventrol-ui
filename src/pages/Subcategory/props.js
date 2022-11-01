import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Form, Input, Select, Tag, Popover, Space, Button, Card, Typography } from 'antd';
import { Colorpicker, ColorPickerValue } from 'antd-colorpicker';
import { EyeOutlined, EditOutlined, DeleteOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';

import * as service from '../../api/services';
import * as layoutConfig from 'utils/config/layout';

import NoticeModal from 'components/ModalTable/NoticeModal';
import DateTimeFormatter from 'components/DateTimeFormatter';

const { Option } = Select;
const { Title } = Typography;

export const initialFormValues = {
    notice: '',
    tagColor: '#7a3db8',
};

export const CustomFormMainItems = () => {
    const [categoryDataSource, setCategpryDataSource] = useState([]);
    const [blockPickerColor, setBlockPickerColor] = useState('#7a3db8');
    const navigate = useNavigate();
    const formLayout = layoutConfig.form;

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
            <Card bordered={false} style={{ padding: '0px' }}>
                <div className="card_header">
                    <Title level={4}>Subcategory Information</Title>
                </div>
                <div className="card_content">
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
                                <Select
                                    placeholder="Please select a category"
                                    style={{ width: '65%', marginRight: '8px' }}
                                >
                                    {categoryDataSource.map((option) => (
                                        <Option key={option.id} value={option.name}>
                                            {option.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item noStyle>
                                <Button
                                    style={{ width: 'calc(35% - 8px)' }}
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
                    <Form.Item {...formLayout.tailLayout} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} className="form_button">
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Card>
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
        title: 'Color',
        dataIndex: 'tagColor',
        key: 'tagColor',
        width: '50px',
        render: (tagColor) => <Tag color={tagColor}>{tagColor}</Tag>,
    },
    {
        title: 'Created on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        width: '140px',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
    },
    {
        title: 'Created by',
        dataIndex: 'createdBy',
        key: 'createdBy',
        width: '120px',
    },
    {
        title: 'Updated on',
        dataIndex: 'updatedOn',
        key: 'updatedOn',
        width: '140px',
        render: (updatedOn) => <DateTimeFormatter data={updatedOn} />,
    },
    {
        title: 'Updated by',
        dataIndex: 'updatedBy',
        key: 'updatedBy',
        width: '130px',
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
        width: '50px',
        align: 'center',
        render: (notice) => <NoticeModal data={notice} />,
    },
];
