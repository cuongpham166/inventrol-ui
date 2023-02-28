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
    Radio,
} from 'antd';
import { ShoppingCartOutlined, DeleteOutlined, CreditCardOutlined, DollarOutlined } from '@ant-design/icons';
import { $ } from 'moneysafe';
import { $$, subtractPercent, addPercent } from 'moneysafe/ledger';

import { DirectOrderCartContext } from 'pages/Order/DirectOrder/NewDirectOrder';

const _ = require('lodash');
const { Text, Title } = Typography;
const { TextArea } = Input;
const { Meta } = Card;

const DirectOrderSummary = (props) => {
    const { directOrderCartData, setDirectOrderCartData } = useContext(DirectOrderCartContext);

    const subtotalCost = directOrderCartData.reduce(
        (total, item) =>
            total +
            item.quantity *
                $$(
                    $(item.retailPrice),
                    // subtract discount
                    subtractPercent(item.discount.discountPercent),
                ).toNumber(),
        0,
    );

    const totalCostWithDiscount = directOrderCartData.reduce(
        (total, item) =>
            total +
            item.quantity *
                $$(
                    $(item.retailPrice),
                    // subtract discount
                    subtractPercent(item.discount.discountPercent),
                    // add tax
                    addPercent(item.vat),
                ).toNumber(),
        0,
    );

    const totalCostWithoutDiscount = directOrderCartData.reduce(
        (total, item) =>
            total +
            item.quantity *
                $$(
                    $(item.retailPrice),
                    // add tax
                    addPercent(item.vat),
                ).toNumber(),
        0,
    );

    const fixedSubtotalCost = $(subtotalCost).toFixed();

    const fixedTotalCostWithDiscount = $(totalCostWithDiscount).toFixed();
    const fixedTotalCostWithoutDiscount = $(totalCostWithoutDiscount).toFixed();

    const totalVAT = $(fixedTotalCostWithDiscount).minus(fixedSubtotalCost).valueOf();
    const totalDiscount = $(fixedTotalCostWithDiscount).minus(fixedTotalCostWithoutDiscount).valueOf();

    const handleRemoveProduct = (productId) => {
        let updatedCart = directOrderCartData.filter((element) => element.id != productId);
        return setDirectOrderCartData(updatedCart);
    };

    const handleChangeQuantity = (value, productId) => {
        let cartDataCopy = [...directOrderCartData];
        let updatedProductIndex = directOrderCartData.findIndex((ele) => ele.id == productId);
        let updatedProduct = directOrderCartData[updatedProductIndex];
        updatedProduct.quantity = value;
        cartDataCopy[updatedProductIndex] = updatedProduct;
        return setDirectOrderCartData(cartDataCopy);
    };

    const productSummaryTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Text strong>{record.name}</Text>,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <InputNumber
                    min={1}
                    max={record.productstock.quantity}
                    defaultValue={1}
                    value={record.quantity}
                    onChange={(e) => {
                        handleChangeQuantity(e, record.id);
                    }}
                />
            ),
        },
        {
            title: 'Total',
            dataIndex: 'index',
            key: 'index',
            align: 'right',
            render: (text, record, index) => (
                <Text strong>
                    {$(
                        record.quantity *
                            $$(
                                $(record.retailPrice),
                                // subtract discount
                                subtractPercent(record.discount.discountPercent),
                                // add tax
                                addPercent(record.vat),
                            ).toNumber(),
                    ).toFixed()}
                </Text>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'name',
            key: 'action',
            width: '50px',
            align: 'left',
            render: (text, record) => (
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
            ),
        },
    ];

    const myOnClick = (value) => {
        console.log('Click', value);
    };

    return (
        <>
            <Card
                title={'Current Order'}
                bordered={false}
                style={{ marginBottom: '24px' }}
                bodyStyle={{ padding: '0 8px', marginTop: '1px' }}
            >
                <Table
                    columns={productSummaryTableColumns}
                    dataSource={_.cloneDeep(directOrderCartData)}
                    rowKey="id"
                    showHeader={false}
                />
            </Card>
            <Card bordered={false} style={{ marginBottom: '24px' }}>
                <Row justify="space-between" align="middle" style={{}}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Subtotal
                    </Title>
                    <Title level={4} style={{ marginTop: '0', fontWeight: 'bold' }}>
                        {fixedSubtotalCost}€
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '10px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        VAT
                    </Title>
                    <Title level={4} style={{ marginTop: '0', fontWeight: 'bold' }}>
                        {totalVAT}€
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '10px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Discount
                    </Title>
                    <Title level={4} style={{ marginTop: '0', fontWeight: 'bold' }} type="danger">
                        {totalDiscount}€
                    </Title>
                </Row>
                <Divider style={{ margin: '12px 0' }} />
                <Row justify="space-between" align="middle" style={{}}>
                    <Title level={3} style={{ margin: '0', color: '#9660c4' }}>
                        Total
                    </Title>
                    <Title level={3} style={{ margin: '0', fontWeight: 'bolder', color: '#9660c4' }}>
                        {$(fixedTotalCostWithDiscount).valueOf()}€
                    </Title>
                </Row>
            </Card>
            <Card bordered={false} style={{}}>
                <Row style={{ marginBottom: '15px' }}>
                    <Col span={12}>
                        <Title level={5} style={{ marginBottom: '15px', marginTop: '0' }}>
                            Payment Method
                        </Title>
                        <Space size="middle">
                            <Card
                                hoverable
                                style={{ width: 110 }}
                                bodyStyle={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
                                onClick={() => myOnClick('cash')}
                            >
                                <DollarOutlined style={{ fontSize: '30px' }} />
                                <Title level={5} style={{ marginTop: '10px', marginBottom: '0' }}>
                                    Cash
                                </Title>
                            </Card>

                            <Card
                                hoverable
                                style={{ width: 110 }}
                                bodyStyle={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
                                onClick={() => myOnClick('card')}
                            >
                                <CreditCardOutlined style={{ fontSize: '30px' }} />
                                <Title level={5} style={{ marginTop: '10px', marginBottom: '0' }}>
                                    Card
                                </Title>
                            </Card>
                        </Space>
                    </Col>
                </Row>
                <Row>
                    <Button
                        type="primary"
                        disabled={directOrderCartData.length > 0 ? false : true}
                        size="large"
                        icon={<ShoppingCartOutlined />}
                        onClick={(e) => {
                            //e.stopPropagation();
                        }}
                    >
                        Place Order
                    </Button>
                </Row>
            </Card>
        </>
    );
};

export default DirectOrderSummary;
