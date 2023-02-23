import React, { useState, useEffect, useRef, useContext } from 'react';
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

import { PurchaseCartContext } from 'pages/Supplier/NewPurchase';

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

    const { cartData, setCartData } = useContext(PurchaseCartContext);

    const totalCost = cartData.reduce((total, item) => total + item.quantity * item.listingPrice, 0);
    const fixedTotalCost = $(totalCost).toFixed();

    const handleChangeQuantity = (value, productId) => {
        let cartDataCopy = [...cartData];
        let updatedProductIndex = cartData.findIndex((ele) => ele.id == productId);
        let updatedProduct = cartData[updatedProductIndex];
        updatedProduct.quantity = value;
        cartDataCopy[updatedProductIndex] = updatedProduct;
        //handleAllChanges(cartDataCopy);
        return setCartData(cartDataCopy);
    };

    const handleRemoveProduct = (productId) => {
        let updatedCart = cartData.filter((element) => element.id != productId);
        //handleAllChanges(updatedCart);
        return setCartData(updatedCart);
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
                <Table columns={productSummaryTableColumns} dataSource={_.cloneDeep(cartData)} rowKey="id" />
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
                    <Col span={10}>
                        <Title level={5} style={{ marginTop: '0' }}>
                            Purchase Notice
                        </Title>
                    </Col>
                    <Col span={14}>
                        <TextArea
                            rows={4}
                            placeholder="Purchase Notice"
                            showCount
                            defaultValue={''}
                            onChange={handleChangeNotice}
                        />
                    </Col>
                </Row>
                <Button
                    type="primary"
                    disabled={cartData.length > 0 ? false : true}
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
