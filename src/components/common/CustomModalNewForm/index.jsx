import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as layoutConfig from '../../../utils/config/layout';
const CustomModalNewForm = ({ CustomFormItems, initialFormValues, table }) => {
    const formLayout = layoutConfig.form;
    const validateMessages = formLayout.validateMessages;

    message.config(layoutConfig.message);

    const [form] = Form.useForm();

    const [modalformTitle, setModalformTitle] = useState('');
    const [openModalformText, setOpenModalformText] = useState('');

    const [open, setOpen] = useState(false);

    const onCreate = async (values) => {
        console.log('Received values of form: ', values);

        setOpen(false);
    };

    const onCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        setModalformTitle('Create a new ' + table);
        setOpenModalformText('New ' + table);
    }, []);

    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
                icon={<PlusOutlined />}
            >
                {openModalformText}
            </Button>
            <Modal
                open={open}
                title={modalformTitle}
                okText="Create"
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
                    initialValues={initialFormValues}
                    validateMessages={validateMessages}
                >
                    {CustomFormItems}
                </Form>
            </Modal>
        </>
    );
};

export default CustomModalNewForm;
