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
    Tag,
} from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { $ } from 'moneysafe';
import { $$, subtractPercent, addPercent } from 'moneysafe/ledger';

const _ = require('lodash');
const { Text, Title } = Typography;
const { TextArea } = Input;

const OrderSummary = (props) => {
    console.log(props.data);
    const subtotalCost = props.data.reduce(
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
    const fixedSubtotalCost = $(subtotalCost).toFixed();

    const totalCostWithDiscount = props.data.reduce(
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

    const totalCostWithoutDiscount = props.data.reduce(
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

    const fixedTotalCostWithDiscount = $(totalCostWithDiscount).toFixed();
    const fixedTotalCostWithoutDiscount = $(totalCostWithoutDiscount).toFixed();

    const shippingCost = fixedTotalCostWithDiscount >= 10 ? 0 : 5;
    const totalVAT = $(fixedTotalCostWithDiscount).minus(fixedSubtotalCost).valueOf();
    const totalDiscount = $(fixedTotalCostWithDiscount).minus(fixedTotalCostWithoutDiscount).valueOf();

    const handleSetMaxQty = (e, productId) => {
        let cartDataCopy = [...props.data];
        let updatedProductIndex = props.data.findIndex((ele) => ele.id == productId);
        let updatedProduct = props.data[updatedProductIndex];
        updatedProduct.quantity = updatedProduct.productstock.quantity;
        cartDataCopy[updatedProductIndex] = updatedProduct;
        return props.setCartData(cartDataCopy);
    };

    const handleChangeNotice = (e) => {
        console.log('Change:', e.target.value);
    };

    const handleRemoveProduct = (productId) => {
        let updatedCart = props.data.filter((element) => element.id != productId);
        return props.setCartData(updatedCart);
    };

    const handleChangeQuantity = (value, productId) => {
        let cartDataCopy = [...props.data];
        let updatedProductIndex = props.data.findIndex((ele) => ele.id == productId);
        let updatedProduct = props.data[updatedProductIndex];
        updatedProduct.quantity = value;
        cartDataCopy[updatedProductIndex] = updatedProduct;
        return props.setCartData(cartDataCopy);
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
            title: 'Unit Price',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            align: 'center',
            render: (text, record, index) => (
                <Text>
                    {$$(
                        $(record.retailPrice),
                        // subtract discount
                        subtractPercent(record.discount.discountPercent),
                    ).toNumber()}
                </Text>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            render: (text, record, index) => (
                <Text>
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
                <Space direction="vertical">
                    <InputNumber
                        min={1}
                        max={record.productstock.quantity}
                        style={{ width: '100%' }}
                        defaultValue={1}
                        value={record.quantity}
                        onChange={(e) => {
                            handleChangeQuantity(e, record.id);
                        }}
                    />
                    <Space>
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
                        <Button
                            type="primary"
                            onClick={(e) => {
                                //e.stopPropagation();
                                handleSetMaxQty(e, record.id);
                            }}
                        >
                            Max
                        </Button>
                    </Space>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Card title="Purchase Summary" bordered={false} style={{}}>
                <Table columns={productSummaryTableColumns} dataSource={_.cloneDeep(props.data)} rowKey="id" />

                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Subtotal
                    </Title>
                    <Title level={5} style={{ marginTop: '0' }}>
                        {fixedSubtotalCost}€
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        VAT
                    </Title>
                    <Title level={5} style={{ marginTop: '0' }}>
                        {totalVAT}€
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Shipping Cost
                    </Title>
                    <Title level={5} style={{ marginTop: '0' }}>
                        {shippingCost == 0 ? 'Free Shipping' : shippingCost + '€'}
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Discount
                    </Title>
                    <Title level={5} style={{ marginTop: '0' }}>
                        {totalDiscount}€
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Total
                    </Title>
                    <Title level={5} style={{ marginTop: '0' }}>
                        {$(fixedTotalCostWithDiscount).plus(shippingCost).valueOf()}€
                    </Title>
                </Row>
                <Divider />
                <Row justify="space-between" align="middle">
                    <Col span={10}>
                        <Title level={5} style={{ marginTop: '0' }}>
                            Order Notice
                        </Title>
                    </Col>
                    <Col span={14}>
                        <TextArea
                            rows={4}
                            placeholder="Order Notice"
                            showCount
                            defaultValue={''}
                            onChange={handleChangeNotice}
                        />
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default OrderSummary;
