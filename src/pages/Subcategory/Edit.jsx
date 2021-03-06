import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, Space, Row, Col, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import * as layoutConfig from '../../utils/config/layout';
import * as service from '../../api/services';

const { Option } = Select;

const EditSubcategory = (props) => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryDataSource, setCategpryDataSource] = useState([]);
    const [formValues, setFormValues] = useState({});

    const formLayout = layoutConfig.form;

    const dataId = parseInt(id);

    const getResultById = async (dataId) => {
        const result = await service.getById('subcategory', dataId);
        await setFormValues(result);
    };

    const getAllCategories = async () => {
        const result = await service.getAll('category');
        setCategpryDataSource(result);
    };

    const onFinish = (value) => {
        //form.resetFields();
        message.success('Sucess: Existing Subcategory has been updated');
        console.log('Success:', value);
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
        const { name, categoryId } = formValues;
        form.setFieldsValue({ name: name });

        let foundCategory = categoryDataSource.find((result) => result.id === categoryId);
        let updatedCategoryData = categoryDataSource.filter((category) => category.id !== categoryId);
        setCategpryDataSource(updatedCategoryData);
        if (foundCategory !== undefined) {
            let categoryValue = foundCategory.name;
            form.setFieldsValue({ categoryId: categoryValue });
        }
    }, [form, formValues]);

    const handleSelectChange = (value) => {
        //console.log('handleSelectChange');
        //console.log(value);
    };

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
                            <Select placeholder="Please select a category" onChange={handleSelectChange}>
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
