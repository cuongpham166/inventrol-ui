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

    /*const onFinish = async (data) => {
        try {
            switch (formType) {
                case 'new':
                    let res = await service.create(table, data);
                    console.log('res');
                    console.log(res);
                    if (res.response.status === 400) {
                        message.error(res.response.data.message);
                    }
                    if (res.status === 201) {
                        message.success('Sucess: New ' + table + ' has been created');
                        form.resetFields();
                    } else {
                        message.error('Error: ' + res.statusText);
                    }

                    break;
                case 'edit':
                    let updateData = {
                        id: dataId,
                        updatedData: data,
                    };
                    res = await service.update(table, updateData);
                    if (res.status != '') {
                        if (res.status === 200) {
                            navigate('/' + table);
                            message.success('Sucess: Existing ' + table + ' has been updated');
                        } else {
                            message.error('Error: ' + res.statusText);
                        }
                    } else {
                        message.error('Error: ' + res.statusText);
                    }
                    break;
                default:
                    console.log('Error');
            }
        } catch (error) {
            console.log(error);
            message.error(error.response.data.message);
        }
    };*/

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
