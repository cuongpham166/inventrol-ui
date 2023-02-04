import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import * as service from '../../api/services';
import * as layoutConfig from 'utils/config/layout';

import DateTimeFormatter from 'components/common/DateTimeFormatter';
import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';

const { Option } = Select;
const { Title, Text } = Typography;
export const initialFormValues = {
    notice: '',
};

export const CustomFormMainItems = () => {
    const [attributeDataSource, setAttributeDataSource] = useState([]);
    const navigate = useNavigate();
    const formLayout = layoutConfig.form;
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

            <Form.Item label="Attribute">
                <Input.Group compact>
                    <Form.Item
                        name="attribute"
                        label="Attribute"
                        noStyle
                        hasFeedback
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select placeholder="Please select an attribute" style={{ width: '65%' }}>
                            {attributeDataSource.map((option) => (
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
                                navigate('/attribute/add');
                            }}
                        >
                            New Attribute
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

export const attributeValueTableColumns = [
    {
        title: 'Id',
        key: 'index',
        render: (text, record, index) => record.id,
        width: 60,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'right',
        render: (text, record) => <CustomDataTableCell data={record} type="attributeValue" />,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Attribute',
        dataIndex: 'attribute',
        key: 'attribute',
        render: (attribute) => <Text>{attribute.name}</Text>,
        sorter: (a, b) => a.attribute.name.localeCompare(b.attribute.name),
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
