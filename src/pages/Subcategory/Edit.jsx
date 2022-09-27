import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Button, Form, Input, Space, Row, Col, Select, message } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import useTopbar from 'utils/hooks/useTopbar';

import * as layoutConfig from '../../utils/config/layout';
import * as service from '../../api/services';
import * as subcategoryService from '../../api/services/Subcategory';

const { Option } = Select;

const EditSubcategory = (props) => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const dataId = parseInt(id);
    const navigate = useNavigate();
    const [categoryDataSource, setCategpryDataSource] = useState([]);
    const [formValues, setFormValues] = useState({});
    const { Topbar } = useTopbar({
        title: '',
        dataId: dataId,
        table: 'subcategory',
    });

    const formLayout = layoutConfig.form;

    const getSubcategoryById = async (dataId) => {
        const result = await service.getById('subcategory', dataId);
        setFormValues(result);
    };

    const getAllCategories = async () => {
        const result = await service.getAll('category');
        setCategpryDataSource(result);
    };

    const onFinish = async (updatedSubcategory) => {
        try {
            //form.resetFields();
            let updatedData = {
                id: dataId,
                updatedSubcategory: updatedSubcategory,
            };
            await subcategoryService.update('subcategory', updatedData);
            navigate('/subcategory');
            message.success('Sucess: Existing subcategory has been updated');
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
        getSubcategoryById(dataId);
    }, []);

    useEffect(() => {
        const { name, category_id, notice } = formValues;
        if (categoryDataSource.length != 0) {
            let foundCategory = categoryDataSource.find((categoryName) => categoryName.id == category_id);
            form.setFieldsValue({
                name: name,
                category: foundCategory.name,
                notice: notice,
            });
        }
    }, [form, formValues]);

    const handleSelectChange = (value) => {};

    return (
        <div style={{}}>
            <Row gutter={[16, 16]}>
                <Topbar />
            </Row>
            <Row style={{ padding: '35px' }} justify="center">
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
                            name="category"
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

                        <Form.Item label="Notice" name="notice">
                            <Input.TextArea allowClear showCount />
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
                                            Update Subcategory
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
