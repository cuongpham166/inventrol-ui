import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, Space, Row, Col, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import * as subcategoryService from '../../api/services/Subcategory';
import * as categoryService from '../../api/services/Category';
import * as layoutConfig from '../../utils/config/layout';

const { Option } = Select;

const EditSubcategory = (props) => {
    const [form] = Form.useForm();
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [categoryDataSource, setCategpryDataSource] = useState([]);
    const [formValues, setFormValues] = useState({});

    const formLayout = layoutConfig.form;

    const dataId = parseInt(id);

    const getResultById = async (dataId) => {
        const result = await subcategoryService.getById(dataId);
        await setFormValues(result);
    };

    const getAllCategories = async () => {
        const result = await categoryService.getAll();
        setCategpryDataSource(result);
    };

    const onFinish = (values) => {
        form.resetFields();

        message.success('Sucess: New Subcategory has been created');
        console.log('Success:', values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        getResultById(dataId);
        getAllCategories();
    }, []);

    useEffect(() => {
        form.setFieldsValue(formValues);
    }, [form, formValues]);

    console.log(formValues);
    return (
        <div style={{ padding: '50px' }}>
            <Row style={{ padding: '35px', backgroundColor: 'whitesmoke' }} justify="center">
                <Col span={15}>
                    <Form
                        {...formLayout.mainLayout}
                        form={form}
                        name="control-hooks"
                        initialValues={{ formValues }}
                        onFinish={onFinish}
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
                            name="categoryId"
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

                        <Form.Item {...formLayout.tailLayout}>
                            <Row justify="space-between">
                                <Col span={4}>
                                    <Button htmlType="button" onClick={onBack}>
                                        Back
                                    </Button>
                                </Col>
                                <Col span={20}>
                                    <Space>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                        <Button htmlType="button" onClick={onReset}>
                                            Reset
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

export default EditSubcategory;