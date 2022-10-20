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
            let res;
            switch (formType) {
                case 'new':
                    res = await service.create(table, data);
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
            message.error('Error: ' + error);
        }
    };

    const CustomForm = () => (
        <Card bordered={false}>
            <div className="card_content">
                <Form
                    {...formLayout.mainLayout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    initialValues={initialFormValues}
                >
                    <CustomFormMainItems />

                    <Form.Item {...formLayout.tailLayout}>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} className="form_button">
                            {formButtonText}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Card>
    );
    return { CustomForm };
};

export default useCustomForm;
