import React, { useState, useEffect } from 'react';
import { Popover, Tag, Descriptions, Button, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

import * as service from '../../api/services';
const { Option } = Select;

export const initialFormValues = {
    notice: '',
};

export const CustomFormMainItems = () => {
    const [attributeDataSource, setAttributeDataSource] = useState([]);

    useEffect(() => {
        getAllAttributes();
    }, []);

    const getAllAttributes = async () => {
        const result = await service.getAll('attribute');
        setAttributeDataSource(result);
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
                name="attribute"
                label="Attribute"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select placeholder="Please select an attribute">
                    {attributeDataSource.map((option) => (
                        <Option key={option.id} value={option.name}>
                            {option.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Notice" name="notice">
                <Input.TextArea allowClear showCount placeholder="Notice" />
            </Form.Item>
        </>
    );
};

export const attributeValueTableColumns = [
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
        render: (text, record) => <Link to={'/attribute-value/' + record.id}>{text}</Link>,
    },
    {
        title: 'Attribute',
        dataIndex: 'attribute',
        key: 'attribute',
        render: (attribute) => <Tag color={attribute.tagColor}>{attribute.name}</Tag>,
    },
    {
        title: 'Created on',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: '120px',
    },
    {
        title: 'Updated on',
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

export const attributeValuePageHeader = (data) => {
    let pageHeaderObj = {};
    let popoverContent = (
        <div>
            <p>{data.notice}</p>
        </div>
    );

    let mainContent = (
        <Descriptions size="small" column={3}>
            <Descriptions.Item label="Attribute">
                <Tag color={data.attribute.tagColor}>{data.attribute.name}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created on">{data.createdDate}</Descriptions.Item>
            <Descriptions.Item label="Updated on">{data.updatedDate}</Descriptions.Item>
            <Descriptions.Item label="Notice">
                <Popover content={popoverContent} title="Notice">
                    <EyeOutlined />
                </Popover>
            </Descriptions.Item>
        </Descriptions>
    );

    let pageHeaderExtra = (
        <>
            <Link to={'/attribute-value/' + data.id + '/edit'}>
                <Button key="1" type="primary" icon={<EditOutlined />}>
                    Update Attribute Value
                </Button>
            </Link>
        </>
    );

    pageHeaderObj = {
        mainContent: mainContent,
        pageHeaderExtra: pageHeaderExtra,
    };
    return pageHeaderObj;
};
