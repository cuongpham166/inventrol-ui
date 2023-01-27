import React from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';

const CustomModalForm = ({ open, onCreate, onCancel, CustomFormItems }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            open={open}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
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
                initialValues={{
                    modifier: 'public',
                }}
            >
                {CustomFormItems}
            </Form>
        </Modal>
    );
};

export default CustomModalForm;
