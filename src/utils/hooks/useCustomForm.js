import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Form, Input, Space, Row, Col, Select, message, Card } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

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
        try {
            switch (formType) {
                case 'new':
                    await service.create(table, data);
                    message.success('Sucess: New ' + table + ' has been created');
                    form.resetFields();
                    break;
                case 'edit':
                    let updateData = {
                        id: dataId,
                        updatedData: data,
                    };
                    await service.update(table, updateData);
                    navigate('/' + table);
                    message.success('Sucess: Existing ' + table + ' has been updated');
                    break;
                default:
                    console.log('Error');
            }
        } catch (error) {
            message.error('Error: ' + error);
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
            <Card bordered={false}>
                <div className="card_content">
                    <CustomFormMainItems />
                    <Form.Item {...formLayout.tailLayout}>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} className="form_button">
                            {formButtonText}
                        </Button>
                    </Form.Item>
                </div>
            </Card>
        </Form>
    );
    return { CustomForm };
};

export default useCustomForm;
