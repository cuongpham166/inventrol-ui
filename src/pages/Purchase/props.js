import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Tag, Tooltip, Button, Card, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import NoticeModal from 'components/ModalTable/NoticeModal';
import DateFormatter from 'components/common/DateFormatter';
import PurchasedItemModal from 'components/Purchase/PurchaseList/PurchasedItemModal';
import PurchaseShippingInfoModal from 'components/Purchase/PurchaseList/PurchaseShippingInfoModal';
import PurchaseShippingStatusCard from 'components/Purchase/PurchaseShipping/PurchaseShippingStatusCard';

import * as layoutConfig from 'utils/config/layout';

const { Option } = Select;
const { Title } = Typography;

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
        render: (text, record, index) => <Link to={'/purchase/' + record.id}>#{record.id}</Link>,
    },
    {
        title: () => <Tooltip title="Purchased Items">Items</Tooltip>,
        dataIndex: 'index',
        key: 'index',
        width: '50px',
        render: (text, record, index) => <PurchasedItemModal data={record} />,
    },
    {
        title: 'Total Cost (€)',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: 'No. of items',
        dataIndex: 'numberOfItems',
        key: 'numberOfItems',
    },
    {
        title: 'Status',
        dataIndex: 'purchaseshipping',
        key: 'purchaseshipping',
        render: (purchaseshipping) => <PurchaseShippingStatusCard status={purchaseshipping.status} />,
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
        render: (supplier) => <Link to={'/supplier/' + supplier.id}>{supplier.name}</Link>,
    },
    {
        title: 'Purchased on',
        dataIndex: 'createdOn',
        key: 'createdOn',
        render: (createdOn) => <DateFormatter data={createdOn} />,
    },
    {
        title: () => <Tooltip title="Shipping Information">Shipping</Tooltip>,
        dataIndex: 'index',
        key: 'index',
        width: '50px',
        align: 'center',
        render: (text, record, index) => <PurchaseShippingInfoModal data={record} />,
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
        width: '50px',
        align: 'center',
        render: (notice) => <NoticeModal data={notice} />,
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
