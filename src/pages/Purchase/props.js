import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Tag, Tooltip, Button, Card, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import DateTimeFormatter from 'components/common/CustomFormatter/DateTimeFormatter';
import PurchaseActionMenu from 'components/Purchase/PurchaseActionMenu';
import PurchaseShippingCard from 'components/Purchase/PurchaseCard/PurchaseShippingCard';

import * as layoutConfig from 'utils/config/layout';

const { Option } = Select;
const { Title, Text } = Typography;

const paymentOptions = [
    {
        value: 'Cash',
        label: 'Cash',
    },
    {
        value: 'PayPal',
        label: 'PayPal',
    },
    {
        value: 'Maestro Card',
        label: 'Maestro Card',
    },
    {
        value: 'Visa Card',
        label: 'Visa Card',
    },
    {
        value: 'Mastercard Card',
        label: 'Mastercard Card',
    },
    {
        value: 'SEPA Direct Debit',
        label: 'SEPA Direct Debit',
    },
];

const courierOptions = [
    {
        value: null,
        label: 'Please select a service',
    },
    {
        value: 'Hermes',
        label: 'Hermes',
    },
    {
        value: 'DPD',
        label: 'DPD',
    },
    {
        value: 'UPS',
        label: 'UPS',
    },
    {
        value: 'DHL',
        label: 'DHL',
    },
];

export const purchaseTableColumns = [
    {
        title: 'ID',
        key: 'index',
        render: (text, record, index) => <Text strong>#{record.id}</Text>,
    },
    {
        title: 'Status',
        dataIndex: 'purchaseshipping',
        key: 'purchaseshipping',
        render: (purchaseshipping) => <PurchaseShippingCard status={purchaseshipping.status} />,
        sorter: (a, b) => a.purchaseshipping.status.localeCompare(b.purchaseshipping.status),
    },
    {
        title: 'Payment',
        dataIndex: 'paymentType',
        key: 'paymentType',
    },
    {
        title: 'Supplier',
        dataIndex: 'supplier',
        key: 'supplier',
        render: (supplier) => <Text>{supplier.name}</Text>,
    },
    {
        title: 'Items',
        dataIndex: 'numberOfItems',
        key: 'numberOfItems',
        align: 'right',
    },
    {
        title: 'Total Cost',
        dataIndex: 'total',
        key: 'total',
        align: 'right',
    },
    {
        title: 'Purchased on',
        dataIndex: 'createdOn',
        align: 'right',
        render: (createdOn) => <DateTimeFormatter data={createdOn} />,
        sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
    },
    {
        title: 'Actions',
        dataIndex: 'name',
        key: 'action',
        width: '50px',
        align: 'center',
        render: (text, record, index) => <PurchaseActionMenu id={record.id} />,
    },
];

export const CustomEditFormMainItems = () => {
    const [categoryDataSource, setCategpryDataSource] = useState([]);
    const navigate = useNavigate();
    const formLayout = layoutConfig.form;

    return (
        <>
            <Card bordered={false} style={{ padding: '0px' }}>
                <div className="card_header">
                    <Title level={4}>Purchase Information</Title>
                </div>
                <div className="card_content">
                    <Form.Item name="courier" label="Service">
                        <Select placeholder="Please select a service" options={courierOptions} />
                    </Form.Item>

                    <Form.Item label="Tracking Number" name="trackingNumber">
                        <Input placeholder="Tracking Number" />
                    </Form.Item>

                    <Form.Item label="Notice" name="notice">
                        <Input.TextArea allowClear showCount placeholder="Notice" />
                    </Form.Item>
                    <Form.Item {...formLayout.tailLayout} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} className="form_button">
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Card>
        </>
    );
};
