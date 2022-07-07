import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Space, Row, Col, Select } from 'antd';

import Topbar from '../../components/Topbar';
import * as componentProps from '../Subcategory/props';
import * as layoutConfig from '../../utils/config/layout';
import * as categoryService from '../../api/services/Category';

const { Option } = Select;

const NewSubcategory = (props) => {
    const [form] = Form.useForm();
    const [categoryDataSource, setCategpryDataSource] = useState([]);
    const topbarProps = componentProps.topbar.new;
    const formLayout = layoutConfig.form;
    const validateMessages = formLayout.validateMessages;

    const onFinish = (values) => {
        form.resetFields();
        console.log('Success:', values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        const result = await categoryService.getAll();
        setCategpryDataSource(result);
    };

    return (
        <div style={{ padding: '50px' }}>
            <Topbar topbar={topbarProps} />
            <Row style={{ padding: '35px', backgroundColor: 'whitesmoke' }} justify="center">
                <Col span={15}>
                    <Form
                        {...formLayout.mainLayout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
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
                            <Input.TextArea allowClear showCount />
                        </Form.Item>

                        <Form.Item {...formLayout.tailLayout}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    Reset
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default NewSubcategory;
