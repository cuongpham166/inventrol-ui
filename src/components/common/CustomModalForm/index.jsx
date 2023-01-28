import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, message } from 'antd';

import * as layoutConfig from '../../../utils/config/layout';
const CustomModalForm = ({ CustomFormItems, initialFormValues, table, formType }) => {
    const formLayout = layoutConfig.form;
    const validateMessages = formLayout.validateMessages;

    message.config(layoutConfig.message);

    const [form] = Form.useForm();

    const [modalformTitle, setModalformTitle] = useState('');
    const [modalformOkText, setModalformOkText] = useState('');
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
        if (formType === 'create') {
            setModalformTitle('Create a new ' + table);
            setModalformOkText('Create');
            setOpenModalformText('New ' + table);
        } else {
            //setFormButtonText('Update ' + table);
        }
    }, []);

    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                {openModalformText}
            </Button>
            <Modal
                open={open}
                title={modalformTitle}
                okText={modalformOkText}
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

export default CustomModalForm;
