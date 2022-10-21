import React, { useState, useRef } from 'react';
import { BarcodeOutlined } from '@ant-design/icons';
import { Space, Col, Input, Row, Checkbox, Popover, Button, Form, Select, Modal } from 'antd';
import skuGenerator from 'utils/functions/skuGenerator';
import * as layoutConfig from 'utils/config/layout';
const { Option } = Select;
const initialSKUFormValues = {
    characterCount: '3',
    sepeator: '/',
    attribute_2: '',
    attribute_3: '',
};

const skuGeneratorFormItems = () => {
    return (
        <>
            <Form.Item label="SKU Format">
                <Input.Group compact>
                    <Form.Item
                        name="characterCount"
                        noStyle
                        rules={[{ required: true, message: 'Character Count is required' }]}
                    >
                        <Select style={{ width: '50%', marginRight: '8px' }} placeholder="Character Count">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="sepeator" noStyle rules={[{ required: true, message: 'Seperator is required' }]}>
                        <Select style={{ width: 'calc(50% - 8px)' }} placeholder="Seperator">
                            <Option value="/">/</Option>
                            <Option value="-">-</Option>
                            <Option value="_">_</Option>
                        </Select>
                    </Form.Item>
                </Input.Group>
            </Form.Item>
            <Form.Item
                label="Item Name"
                name="itemName"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
                label="Attribute 1"
                name="attribute_1"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Attribute 1" />
            </Form.Item>
            <Form.Item label="Attribute 2" name="attribute_2" hasFeedback>
                <Input placeholder="Attribute 2" />
            </Form.Item>
            <Form.Item label="Attribute 3" name="attribute_3" hasFeedback>
                <Input placeholder="Attribute 3" />
            </Form.Item>
        </>
    );
};
const SkuGenerator = (props) => {
    const [skuValue, setSkuValue] = useState('');
    const skuValueRef = useRef(skuValue);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onChangeSKU = () => {
        setIsModalOpen(true);
    };

    const ModalSKU = () => {
        const [skuForm] = Form.useForm();
        const formLayout = layoutConfig.form;

        const handleSkuGenerate = (values) => {
            let skuString = skuGenerator(values);
            skuValueRef.current = skuString;
            setSkuValue(skuString);
            setIsModalOpen(false);
            console.log(skuValue);
            return props.onClick(skuValueRef.current);
        };
        const handleCancel = () => {
            setIsModalOpen(false);
        };

        return (
            <>
                <Modal
                    title="SKU Generator"
                    open={isModalOpen}
                    onOk={() => {
                        skuForm
                            .validateFields()
                            .then((values) => {
                                skuForm.resetFields();
                                handleSkuGenerate(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={handleCancel}
                    okText="Generate"
                >
                    <Form
                        form={skuForm}
                        layout="horizontal"
                        name="form_in_modal"
                        initialValues={initialSKUFormValues}
                        {...formLayout.mainLayout}
                    >
                        {skuGeneratorFormItems}
                    </Form>
                </Modal>
            </>
        );
    };

    return (
        <>
            <ModalSKU />
            <Button icon={<BarcodeOutlined />} onClick={onChangeSKU}>
                Generate SKU
            </Button>
        </>
    );
};

export default SkuGenerator;
