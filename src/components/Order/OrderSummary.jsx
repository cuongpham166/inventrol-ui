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

const OrderSummary = ({ data }) => {
    const [total, setTotal] = useState(0);
    const totalRef = useRef(total);

    const [dataSource, setDataSource] = useState([]);
    const dataSourceRef = useRef(dataSource);

    const [disabledButton, setDisabledButton] = useState(true);
    const disabledButtonRef = useRef(disabledButton);

    const handleAllChanges = (data) => {
        dataSourceRef.current = data;
        setDataSource(data);
        let newTotalCost = data.reduce((total, item) => total + item.quantity * item.retailPrice, 0);
        let newFixedTotalCost = $(newTotalCost).toFixed();
        totalRef.current = newFixedTotalCost;
        setTotal(newFixedTotalCost);
        if (data.length == 0) {
            disabledButtonRef.current = true;
            setDisabledButton(true);
        }
    };

    const handleRemoveProduct = (productId) => {
        let updatedCart = dataSourceRef.current.filter((element) => element.id != productId);
        handleAllChanges(updatedCart);
    };

    const handleChangeQuantity = (value, productId) => {
        let cartDataCopy = [...dataSourceRef.current];
        let updatedProductIndex = dataSourceRef.current.findIndex((ele) => ele.id == productId);
        let updatedProduct = dataSourceRef.current[updatedProductIndex];
        updatedProduct.quantity = value;
        cartDataCopy[updatedProductIndex] = updatedProduct;
        handleAllChanges(cartDataCopy);
    };

    const handleSetMaxQty = (e, productId) => {};

    const updatePurchaseCart = (data) => {
        if (data.length > 0) {
            const countDict = data.reduce((acc, curr) => {
                const { name } = curr;
                if (acc[name]) ++acc[name];
                else acc[name] = 1;
                return acc;
            }, {});

            let result = data.map((obj) => {
                obj['quantity'] = countDict[obj.name];
                return obj;
            });

            result = result.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name));
            dataSourceRef.current = result;
            setDataSource(result);
        }
    };

    const updatePurchaseCost = (data) => {
        const totalCost = data.reduce((total, item) => total + item.retailPrice, 0);
        const fixedTotalCost = $(totalCost).toFixed();
        totalRef.current = fixedTotalCost;
        setTotal(fixedTotalCost);
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
            title: 'Unit Price',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            align: 'center',
            render: (retailPrice) => <Text>{$(retailPrice).toFixed()} </Text>,
        },
        {
            title: 'Total',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            render: (text, record, index) => <Text>{$(record.retailPrice * record.quantity).toFixed()} </Text>,
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

    useEffect(() => {
        dataSourceRef.current = data;
        setDataSource(dataSourceRef.current);
        updatePurchaseCart(data);
        updatePurchaseCost(data);
        if (data.length > 0) {
            disabledButtonRef.current = false;
            setDisabledButton(false);
        }
    }, [data]);
    return (
        <>
            <Card title="Purchase Summary" bordered={false} style={{}}>
                <Table columns={productSummaryTableColumns} dataSource={_.cloneDeep(dataSource)} rowKey="id" />

                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Subtotal
                    </Title>
                    <Title level={5} style={{ marginTop: '0' }}>
                        {totalRef.current}€
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Shipping Cost
                    </Title>
                    <Title level={5} style={{ marginTop: '0' }}>
                        {totalRef.current >= 50 ? 'Free Shipping' : 5 + '€'}
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        VAT (7%)
                    </Title>
                    <Title level={5} style={{ marginTop: '0' }}>
                        {}
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        VAT (19%)
                    </Title>
                    <Title level={5} style={{ marginTop: '0' }}>
                        {}
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Discount
                    </Title>
                    <Title level={5} style={{ marginTop: '0' }}>
                        {}
                    </Title>
                </Row>
                <Row justify="space-between" align="middle" style={{ marginTop: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Total
                    </Title>
                    <Title level={5} style={{ marginTop: '0' }}>
                        {}
                    </Title>
                </Row>
                <Divider />
                <Row justify="space-between" align="middle" style={{ marginBottom: '30px' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Order Notice
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
                    disabled={disabledButtonRef.current}
                    icon={<ShoppingCartOutlined />}
                    onClick={(e) => {
                        //e.stopPropagation();
                    }}
                >
                    Place Order
                </Button>
            </Card>
        </>
    );
};

export default OrderSummary;
