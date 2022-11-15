import React, { useState, useEffect, useRef } from 'react';
import {
    Row,
    Col,
    Card,
    Table,
    Divider,
    Typography,
    Button,
    InputNumber,
    Select,
    Space,
    Popconfirm,
    Input,
} from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { $ } from 'moneysafe';
import { $$, subtractPercent, addPercent } from 'moneysafe/ledger';

const _ = require('lodash');
const { Text, Title } = Typography;
const { TextArea } = Input;

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
        value: 'Mastercard',
        label: 'Mastercard',
    },
    {
        value: 'SEPA Direct Debit',
        label: 'SEPA Direct Debit',
    },
];

const PurchaseSummary = (props) => {
    const [paymentType, setPaymentType] = useState();
    const paymentTypeRef = useRef(paymentType);

    const totalCost = props.data.reduce((total, item) => total + item.quantity * item.listingPrice, 0);
    const fixedTotalCost = $(totalCost).toFixed();

    const handleChangeQuantity = (value, productId) => {
        let cartDataCopy = [...props.data];
        let updatedProductIndex = props.data.findIndex((ele) => ele.id == productId);
        let updatedProduct = props.data[updatedProductIndex];
        updatedProduct.quantity = value;
        cartDataCopy[updatedProductIndex] = updatedProduct;
        //handleAllChanges(cartDataCopy);
        return props.setCartData(cartDataCopy);
    };

    const handleRemoveProduct = (productId) => {
        let updatedCart = props.data.filter((element) => element.id != productId);
        console.log(updatedCart);
        //handleAllChanges(updatedCart);
        return props.setCartData(updatedCart);
    };

    const handleChangePayment = (value) => {
        paymentTypeRef.current = value;
        setPaymentType(value);
    };

    const handleChangeNotice = (e) => {
        console.log('Change:', e.target.value);
    };

    const productSummaryTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{record.name}</Text>
                    <Text>{record.barcode}</Text>
                </Space>
            ),
        },
        {
            title: 'Qty',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Unit Cost',
            dataIndex: 'listingPrice',
            key: 'listingPrice',
            align: 'center',
            render: (listingPrice) => <Text>{$(listingPrice).toFixed()} </Text>,
        },
        {
            title: 'Total',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            render: (text, record, index) => <Text>{$(record.listingPrice * record.quantity).toFixed()} </Text>,
        },
        {
            title: 'Actions',
            dataIndex: 'name',
            key: 'action',
            width: '50px',
            align: 'left',
            render: (text, record) => (
                <Space direction="vertical">
                    <InputNumber
                        min={1}
                        max={100}
                        defaultValue={1}
                        value={record.quantity}
                        onChange={(e) => {
                            handleChangeQuantity(e, record.id);
                        }}
                    />
                    <Popconfirm
                        title="Are you sure to remove this product ?"
                        onConfirm={() => {
                            handleRemoveProduct(record.id);
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} type="primary" danger></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Card title="Purchase Summary" bordered={false} style={{}}>
                <Table columns={productSummaryTableColumns} dataSource={_.cloneDeep(props.data)} rowKey="id" />
                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={4} style={{ marginTop: '0' }}>
                        Total Purchase Cost
                    </Title>
                    <Title level={4} style={{ marginTop: '0' }}>
                        {fixedTotalCost}€
                    </Title>
                </Row>
                <Divider />
                <Row justify="space-between" align="middle" style={{ marginBottom: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Payment Method
                    </Title>
                    <Select
                        defaultValue="Cash"
                        style={{
                            width: 180,
                        }}
                        onChange={handleChangePayment}
                        options={paymentOptions}
                    />
                </Row>
                <Row justify="space-between" align="middle" style={{ marginBottom: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Purchase Notice
                    </Title>
                    <TextArea
                        rows={4}
                        placeholder="Purchase Notice"
                        showCount
                        defaultValue={''}
                        onChange={handleChangeNotice}
                    />
                </Row>
                <Button
                    type="primary"
                    disabled={props.data.length > 0 ? false : true}
                    icon={<ShoppingCartOutlined />}
                    onClick={(e) => {
                        //e.stopPropagation();
                    }}
                >
                    Make Purchase
                </Button>
            </Card>
        </>
    );
};

export default PurchaseSummary;
