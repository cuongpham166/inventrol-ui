import React, { useState, useEffect } from 'react';

import { Button, Form, Input, Space, Row, Col, Select, message, Typography, Divider, Card } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/Breadcrumb';

import * as layoutConfig from 'utils/config/layout';
import * as supplierProps from '../Supplier/props';

import usePageHeader from 'utils/hooks/usePageHeader';
const { Title } = Typography;

const NewSupplier = (props) => {
    const [form] = Form.useForm();

    const { PageHeader } = usePageHeader({
        title: 'New Supplier',
        dataId: '',
        table: 'supplier',
    });

    const formLayout = layoutConfig.form;
    const validateMessages = formLayout.validateMessages;
    const initialFormValues = supplierProps.initialFormValues;

    message.config(layoutConfig.message);

    const onFinish = async (data) => {
        console.log(data);
    };

    return (
        <div>
            <Row>
                <Breadcrumb />
            </Row>
            <Row>
                <PageHeader />
            </Row>
            <Row justify="center">
                <Col span={14}>
                    <Form
                        {...formLayout.mainLayout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                        initialValues={initialFormValues}
                        className="form"
                    >
                        <Card bordered={false} style={{ marginBottom: '24px' }}>
                            <div className="card_header">
                                <Title level={4}>Personal Information</Title>
                            </div>
                            <div className="card_content">
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Name is required',
                                        },
                                    ]}
                                >
                                    <Input placeholder={'Name'} />
                                </Form.Item>
                                <Form.Item
                                    label="Contact Person"
                                    name="contactPerson"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Contact Person is required',
                                        },
                                    ]}
                                >
                                    <Input placeholder={'Contact Person'} />
                                </Form.Item>
                                <Form.Item label="Website" name="website" hasFeedback>
                                    <Input placeholder={'Website'} />
                                </Form.Item>

                                <Form.Item label="Notice" name="notice">
                                    <Input.TextArea allowClear showCount placeholder={'Notice'} />
                                </Form.Item>
                            </div>
                        </Card>
                        <Card bordered={false}>
                            <div className="card_header">
                                <Title level={4}>Contact Information</Title>
                            </div>
                            <div className="card_content">
                                <Form.Item label="Phone Number" name="phone_number" hasFeedback>
                                    <Input placeholder={'Phone Number'} />
                                </Form.Item>
                                <Form.Item label="Mobile Number" name="mobile_number" hasFeedback>
                                    <Input placeholder={'Mobile Number'} />
                                </Form.Item>
                                <Form.Item label="Adress">
                                    <Input.Group compact>
                                        <Form.Item
                                            name={['street_name']}
                                            noStyle
                                            rules={[{ required: true, message: ' Street Name is required' }]}
                                        >
                                            <Input style={{ width: 'calc(70% - 8px)' }} placeholder="Street Name" />
                                        </Form.Item>
                                        <Form.Item
                                            name={['street_number']}
                                            noStyle
                                            rules={[{ required: true, message: 'Street Number is required' }]}
                                        >
                                            <Input
                                                style={{ width: '30%', marginLeft: '8px' }}
                                                placeholder="Street Number"
                                            />
                                        </Form.Item>
                                    </Input.Group>

                                    <Form.Item name="additional_address_line" noStyle>
                                        <Input
                                            style={{ width: '100%', marginTop: '8px' }}
                                            placeholder="Additional Address Line"
                                        />
                                    </Form.Item>

                                    <Input.Group compact style={{ marginTop: '8px' }}>
                                        <Form.Item
                                            name={['postcode']}
                                            noStyle
                                            rules={[{ required: true, message: 'Postcode is required' }]}
                                        >
                                            <Input style={{ width: 'calc(20% - 8px)' }} placeholder="Postcode" />
                                        </Form.Item>
                                        <Form.Item
                                            name={['city']}
                                            noStyle
                                            rules={[{ required: true, message: 'City is required' }]}
                                        >
                                            <Input
                                                style={{ width: 'calc(40% - 8px)', margin: '0 8px' }}
                                                placeholder="City"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name={['country']}
                                            noStyle
                                            rules={[{ required: true, message: 'Country is required' }]}
                                        >
                                            <Input style={{ width: '40%' }} placeholder="Country" />
                                        </Form.Item>
                                    </Input.Group>
                                </Form.Item>

                                <Form.Item {...formLayout.tailLayout}>
                                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                        Save New Supplier
                                    </Button>
                                </Form.Item>
                            </div>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default NewSupplier;
