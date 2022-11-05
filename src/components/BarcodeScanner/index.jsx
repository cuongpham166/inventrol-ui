import React, { useState, useRef } from 'react';
import { BarcodeOutlined } from '@ant-design/icons';
import { Space, Col, Input, Row, Checkbox, Popover, Button, Form, Select, Modal } from 'antd';
import * as layoutConfig from 'utils/config/layout';
const { Option } = Select;
const barcodeScannerFormItems = () => {
    return (
        <>
            <Form.Item
                label="Barcode"
                name="barcode"
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Barcode" />
            </Form.Item>
        </>
    );
};

const BarcodeScanner = (props) => {
    const [barcodeValue, setBarcodeValue] = useState('');
    const barcodeValueRef = useRef(barcodeValue);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onChangeBarcode = () => {
        setIsModalOpen(true);
    };

    const ModalBarcode = () => {
        const [barcodeForm] = Form.useForm();
        const formLayout = layoutConfig.form;

        const handleBarcodeScanner = (values) => {
            let barcodeValue = values;
            barcodeValueRef.current = barcodeValue;
            setBarcodeValue(barcodeValue);
            setIsModalOpen(false);
            return props.onClick(barcodeValueRef.current);
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
                        barcodeForm
                            .validateFields()
                            .then((values) => {
                                barcodeForm.resetFields();
                                handleBarcodeScanner(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={handleCancel}
                    okText="Save"
                >
                    <Form
                        form={barcodeForm}
                        layout="horizontal"
                        name="form_in_modal"
                        initialValues={{}}
                        {...formLayout.mainLayout}
                    >
                        {barcodeScannerFormItems}
                    </Form>
                </Modal>
            </>
        );
    };

    return (
        <>
            <ModalBarcode />
            <Button icon={<BarcodeOutlined />} onClick={onChangeBarcode} type={'primary'}>
                Scan Barcode
            </Button>
        </>
    );
};

export default BarcodeScanner;
