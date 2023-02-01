import React, { useState, useEffect } from 'react';
import { Space, Button, Dropdown, Menu, Modal, Form, Tooltip, message, Select, Input } from 'antd';

import { ExportOutlined } from '@ant-design/icons';

import * as layoutConfig from '../../../../utils/config/layout';

const { Option } = Select;

const CustomDataTableExporter = (props) => {
    const formLayout = layoutConfig.form;
    const validateMessages = formLayout.validateMessages;

    message.config(layoutConfig.message);

    const [form] = Form.useForm();

    const [open, setOpen] = useState(false);

    const onCreate = async (values) => {
        console.log('Received values of form: ', values);

        setOpen(false);
    };

    const onCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Export Data">
                <Button
                    icon={<ExportOutlined />}
                    onClick={() => {
                        setOpen(true);
                    }}
                ></Button>
                <Modal
                    open={open}
                    title="Export Data"
                    okText="Export"
                    cancelText="Cancel"
                    destroyOnClose
                    onCancel={onCancel}
                    onOk={() => {
                        form.validateFields()
                            .then((values) => {
                                form.resetFields();
                                onCreate(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{}}
                        validateMessages={validateMessages}
                        requiredMark={true}
                    >
                        <Form.Item name="fileformat" label="File Format" hasFeedback rules={[{ required: true }]}>
                            <Select placeholder="Please select a format">
                                <Option value="pdf">PDF</Option>
                                <Option value="csv">CSV</Option>
                                <Option value="json">JSON</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="filname" label="Filename" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Tooltip>
        </>
    );
};

export default CustomDataTableExporter;
