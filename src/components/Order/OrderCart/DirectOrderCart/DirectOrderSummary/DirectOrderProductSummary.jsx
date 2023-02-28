import React, { useState, useEffect, useRef, useContext } from 'react';

import { Card, Table, Typography, Button, InputNumber, Popconfirm, Input } from 'antd';

import { DirectOrderCartContext } from 'pages/Order/DirectOrder/NewDirectOrder';
import { DeleteOutlined } from '@ant-design/icons';
import { $ } from 'moneysafe';
import { $$, subtractPercent, addPercent } from 'moneysafe/ledger';

const _ = require('lodash');
const { Text } = Typography;

const DirectOrderProductSummary = (props) => {
    const { directOrderCartData, setDirectOrderCartData } = useContext(DirectOrderCartContext);
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

    return (
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
    );
};

export default DirectOrderProductSummary;
