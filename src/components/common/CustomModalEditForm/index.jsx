import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal, message } from 'antd';

import * as layoutConfig from '../../../utils/config/layout';

import * as service from '../../../api/services';

const CustomModalEditForm = ({
    isEditModalOpen,
    handleEditModalOk,
    handleExitModalCancel,
    dataID,
    CustomFormItems,
    table,
}) => {
    const [modalformTitle, setModalformTitle] = useState('');

    const formLayout = layoutConfig.form;
    const validateMessages = formLayout.validateMessages;

    message.config(layoutConfig.message);

    const [form] = Form.useForm();

    const getDetailBrand = async (dataID) => {
        const result = await service.getById('brand', dataID);
        setModalformTitle('Update an existing ' + table);
        form.setFieldsValue({ name: result.name, notice: result.notice });
    };

    useEffect(() => {
        getDetailBrand(dataID);
    }, []);

    return (
        <>
            <Modal
                title={modalformTitle}
                open={isEditModalOpen}
                onCancel={handleExitModalCancel}
                okText="Update"
                cancelText="Cancel"
                destroyOnClose
                width={600}
                closable={false}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            form.resetFields();
                            handleEditModalOk(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form form={form} layout="vertical" name="form_in_modal" validateMessages={validateMessages}>
                    {CustomFormItems}
                </Form>
            </Modal>
        </>
    );
};

export default CustomModalEditForm;
