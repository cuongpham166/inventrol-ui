import React, { useState, useEffect, useRef } from 'react';
import { Popover, Tag, Button, Modal, Table, Form, Input, Checkbox } from 'antd';
import * as layoutConfig from '../../utils/config/layout';
import * as service from '../../api/services/index';
const OrderAddressModalForm = (props) => {
    const [form] = Form.useForm();
    const formLayout = layoutConfig.form;
    const validateMessages = formLayout.validateMessages;
    if (props.formType == 'Create') {
        form.setFieldsValue({ notice: '', additionalAddressLine: '' });
    }

    const setFormValues = async () => {
        let result = await service.getAll('customer/' + props.customerId + '/address/' + props.addressId);
        form.setFieldsValue({
            streetName: result.streetName,
            streetNumber: result.streetNumber,
            additionalAddressLine: result.additionalAddressLine,
            postcode: result.postcode,
            city: result.city,
            country: result.country,
            primary: result.primary,
            notice: result.notice,
        });
    };

    if (props.formType == 'Update') {
        setFormValues();
    }

    return (
        <Modal
            title={props.formTitle}
            open={props.open}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        props.onSave(values);
                        form.resetFields();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            onCancel={props.onCancel}
            okText={'Save'}
            closable={false}
        >
            <Form
                form={form}
                layout="horizontal"
                name="form_in_modal"
                validateMessages={validateMessages}
                //initialValues={props.initialFormValues}
            >
                <Form.Item name="primary" label="Set as primary address" valuePropName="checked">
                    <Checkbox disabled>Primary Address</Checkbox>
                </Form.Item>
                <Form.Item label="Address 1">
                    <Input.Group compact>
                        <Form.Item
                            name="streetName"
                            label="Street Name"
                            hasFeedback
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Street Name" style={{ width: '60%', marginRight: '8px' }} />
                        </Form.Item>
                        <Form.Item
                            name="streetNumber"
                            label="Street Number"
                            hasFeedback
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Street Number" style={{ width: 'calc(40% - 8px)' }} />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item name="additionalAddressLine" label="Address 2">
                    <Input placeholder="Additional Address Line" />
                </Form.Item>
                <Form.Item label="Postcode & City">
                    <Input.Group compact>
                        <Form.Item
                            name="postcode"
                            noStyle
                            rules={[{ required: true, message: 'Postcode is required' }]}
                        >
                            <Input style={{ width: '40%', marginRight: '8px' }} placeholder="Postcode" />
                        </Form.Item>
                        <Form.Item name="city" noStyle rules={[{ required: true, message: 'City is required' }]}>
                            <Input style={{ width: 'calc(60% - 8px)' }} placeholder="City" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Country is required' }]}>
                    <Input placeholder="Country" />
                </Form.Item>
                <Form.Item label="Notice" name="notice">
                    <Input.TextArea allowClear showCount placeholder="Notice" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrderAddressModalForm;
