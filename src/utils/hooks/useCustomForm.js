import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Form, Input, Space, Row, Col, Select, message } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import * as layoutConfig from '../../utils/config/layout';
import * as service from '../../api/services/index';

const useCustomForm = ({ table, initialFormValues, CustomFormMainItems, formType, dataId }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const formLayout = layoutConfig.form;
    const validateMessages = formLayout.validateMessages;

    message.config(layoutConfig.message);

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

    const onBack = () => {
        navigate(-1);
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
            <Form.Item {...formLayout.tailLayout}>
                <Row justify="space-between">
                    <Col span={4}>
                        <Button htmlType="button" onClick={onBack} icon={<ArrowLeftOutlined />}>
                            Back
                        </Button>
                    </Col>
                    <Col span={20} style={{ textAlign: 'right' }}>
                        <Space>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} className="form_button">
                                Save New {table}
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
    return { CustomForm };
};

export default useCustomForm;
