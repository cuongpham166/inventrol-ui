import React, { useState, useEffect } from 'react';
import { Popover, Tag, Descriptions, Button, Form, Input, Select, Typography, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EyeOutlined, EditOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';

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
            <Card bordered={false} style={{ padding: '0px' }}>
                <div className="card_header">
                    <Title level={4}>Attribute Value Information</Title>
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
                                <Select
                                    placeholder="Please select an attribute"
                                    style={{ width: '65%', marginRight: '8px' }}
                                >
                                    {attributeDataSource.map((option) => (
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
