import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useTopbar from 'utils/hooks/useTopbar';

import { Button, Form, Input, Space, Row, Col, Select, message, Typography, Divider } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import * as layoutConfig from 'utils/config/layout';
import * as supplierProps from '../Supplier/props';

const { Title } = Typography;

const NewSupplier = (props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { Topbar } = useTopbar({
        title: 'Create New Supplier',
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

    const onBack = () => {
        navigate(-1);
    };
    return (
        <div>
            <Topbar />
            <Row style={{ padding: '35px' }} justify="center">
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
                        <div className="form_container">
                            <Title level={4} className="form_title" style={{ fontWeight: '700' }}>
                                Personal Information
                            </Title>
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
                                <Input />
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
                                <Input />
                            </Form.Item>
                            <Form.Item label="Website" name="website" hasFeedback>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Notice" name="notice">
                                <Input.TextArea allowClear showCount />
                            </Form.Item>
                        </div>
                        <Divider />
                        <div className="form_container">
                            <Title level={4} className="form_title" style={{ fontWeight: '700' }}>
                                Contact Information
                            </Title>
                            <Form.Item label="Phone Number" name="phone_number" hasFeedback>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Mobile Number" name="mobile_number" hasFeedback>
                                <Input />
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
                        </div>
                        <Form.Item {...formLayout.tailLayout}>
                            <Row justify="space-between">
                                <Col span={4}>
                                    <Button htmlType="button" onClick={onBack} icon={<ArrowLeftOutlined />}>
                                        Back
                                    </Button>
                                </Col>
                                <Col span={20} style={{ textAlign: 'right' }}>
                                    <Space>
                                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                            Save New Supplier
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default NewSupplier;
