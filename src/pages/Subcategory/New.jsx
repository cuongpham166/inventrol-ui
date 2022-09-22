import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, Space, Row, Col, Select, message } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import useTopbar from 'utils/hooks/useTopbar';

import * as componentProps from '../Subcategory/props';
import * as layoutConfig from '../../utils/config/layout';
import * as service from '../../api/services';
import * as subcategoryService from '../../api/services/Subcategory';
const { Option } = Select;

const NewSubcategory = (props) => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [categoryDataSource, setCategpryDataSource] = useState([]);
    const navigate = useNavigate();

    const { Topbar } = useTopbar({
        title: 'Create New Subcategory',
        dataId: '',
        table: 'subcategory',
    });

    const formLayout = layoutConfig.form;
    const validateMessages = formLayout.validateMessages;

    message.config(layoutConfig.message);

    const onFinish = async (newSubcategory) => {
        try {
            form.resetFields();
            //create new subcategory
            await subcategoryService.create('subcategory', newSubcategory);
            message.success('Sucess: New subcategory has been created');
        } catch (error) {
            message.error('Error: ' + error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        const result = await service.getAll('category');
        setCategpryDataSource(result);
    };

    return (
        <div style={{}}>
            <Topbar />
            <Row style={{ padding: '35px' }} justify="center">
                <Col span={15}>
                    <Form
                        {...formLayout.mainLayout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                        initialValues={{}}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="category"
                            label="Category"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select placeholder="Please select a category">
                                {categoryDataSource.map((option) => (
                                    <Option key={option.id} value={'' + option.id}>
                                        {option.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Notice" name="notice">
                            <Input.TextArea allowClear showCount defaultValue="" />
                        </Form.Item>

                        <Form.Item {...formLayout.tailLayout}>
                            <Row justify="space-between">
                                <Col span={4}>
                                    <Button htmlType="button" onClick={onBack} icon={<ArrowLeftOutlined />}>
                                        Back
                                    </Button>
                                </Col>
                                <Col span={20} style={{ textAlign: 'right' }}>
                                    <Space>
                                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                            Save New Subcategory
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default NewSubcategory;
