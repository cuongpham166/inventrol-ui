import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Form, Input, Space, Row, Col, Select, message, Card } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import * as httpRequest from '../../utils/httpRequest';
import * as layoutConfig from '../../utils/config/layout';
import * as service from '../../api/services/index';

const useCustomForm = ({ table, initialFormValues, CustomFormMainItems, formType, dataId }) => {
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [formButtonText, setFormButtonText] = useState('');
    const formLayout = layoutConfig.form;
    const validateMessages = formLayout.validateMessages;

    message.config(layoutConfig.message);

    useEffect(() => {
        if (formType === 'new') {
            setFormButtonText('Save New ' + table);
        } else {
            setFormButtonText('Update ' + table);
        }
    }, []);

    const onFinish = async (data) => {
        let res;
        switch (formType) {
            case 'new':
                res = await service.create(table, data);
                switch (res.status) {
                    case 400:
                        message.error(res.message);
                        break;
                    case 200:
                        message.success(res.message);
                        form.resetFields();
                    default:
                        break;
                }
                break;
            case 'edit':
                let updateData = {
                    id: dataId,
                    updatedData: data,
                };
                res = await service.update(table, updateData);
                switch (res.status) {
                    case 400:
                        message.error(res.message);
                        break;
                    case 200:
                        message.success(res.message);
                        form.resetFields();
                        navigate('/' + table);
                    default:
                        break;
                }
                break;
            default:
                console.log('Error');
        }
    };

    const CustomForm = () => (
        <Form
            {...formLayout.mainLayout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            validateMessages={validateMessages}
            initialValues={initialFormValues}
        >
            <CustomFormMainItems />
        </Form>
    );
    return { CustomForm, form };
};

export default useCustomForm;
