import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Tabs, Typography, Space, Button, Select, Row, Col, Form, Input } from 'antd';
import { ShoppingCartOutlined, PlusOutlined } from '@ant-design/icons';
import * as service from '../../../api/services';

import { $ } from 'moneysafe';
import { $$, subtractPercent, addPercent } from 'moneysafe/ledger';
import ProductNameColumn from 'components/Product/ProductNameColumn';
import OrderAddressList from '../OrderAddressList';
const { Text, Title } = Typography;

const OrderProductList = (props) => {
    const [showProductList, setShowProductList] = useState(false);

    const [defaultDatasource, setDefaultDatasource] = useState([]);
    const [datasource, setDatasource] = useState([]);
    const [tabItems, setTabItems] = useState([]);
    const getAllProducts = async () => {
        let result = await service.getAll('product');
        let products = result.filter((element) => element.productstock.quantity > 0);
        products.sort((a, b) => {
            return a.id - b.id;
        });
        products.map((ele, index) => {
            ele.quantity = 0;
        });
        let tabItemSet = new Set();
        tabItemSet.add('All');
        products.map((value, index) => {
            tabItemSet.add(value.subcategory.category.name);
        });
        setTabItems([...tabItemSet]);
        setDatasource(products);
        setDefaultDatasource(products);
    };

    const productListTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => <ProductNameColumn data={record} />,
        },
        {
            title: 'Qty',
            dataIndex: 'productstock',
            key: 'productstock',
            align: 'center',
            render: (productstock) => <Text>{productstock.quantity} </Text>,
        },
        {
            title: 'VAT',
            dataIndex: 'vat',
            key: 'vat',
            align: 'center',
            render: (vat) => <Text>{vat}%</Text>,
        },
        {
            title: 'Price',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            align: 'center',
            render: (text, record, index) => (
                <>
                    {record.discount.discountPercent > 0 ? (
                        <Space direction="vertical">
                            <Tag color="#7A3DB8">-{record.discount.discountPercent}%</Tag>
                            <Text delete>{$(record.retailPrice).toFixed()} </Text>
                            <Text type="danger" strong>
                                {$$(
                                    $(record.retailPrice),
                                    // subtract discount
                                    subtractPercent(record.discount.discountPercent),
                                ).toNumber()}
                            </Text>
                        </Space>
                    ) : (
                        <Text>{$(record.retailPrice).toFixed()} </Text>
                    )}
                </>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'name',
            key: 'action',
            width: '50px',
            align: 'center',
            render: (text, record) => (
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                        //e.stopPropagation();
                        handleAddProduct(e, record.id);
                    }}
                ></Button>
            ),
        },
    ];

    const handleAddProduct = (e, productId) => {
        let foundProduct = defaultDatasource.find((element) => element.id == productId);
        if (props.data.length == 0) {
            foundProduct.quantity = 1;
            return props.setCartData((prevState) => [...(prevState || []), foundProduct]);
        } else {
            let foundProductInCart = props.data.find((ele) => ele.id == productId);
            if (foundProductInCart) {
                //exist
                //increase quantity
                //setCartData
                if (foundProduct.quantity < foundProduct.productstock.quantity) {
                    let cartDataCopy = [...props.data];
                    let updatedProductIndex = props.data.findIndex((ele) => ele.id == productId);
                    let updatedProduct = props.data[updatedProductIndex];
                    updatedProduct.quantity += 1;
                    cartDataCopy[updatedProductIndex] = updatedProduct;
                    return props.setCartData(cartDataCopy);
                }
            } else {
                //not exist
                //set quantity = 1
                //setCartData
                foundProduct.quantity = 1;
                return props.setCartData((prevState) => [...(prevState || []), foundProduct]);
            }
        }
    };

    const onChange = (key) => {
        if (key == 'All') {
            setDatasource(defaultDatasource);
        } else {
            setDatasource(defaultDatasource);
            let data = defaultDatasource.filter((value) => value.subcategory.category.name === key);
            setDatasource(data);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <>
            {showProductList == true ? (
                <Card
                    title={
                        <Row justify="space-between">
                            <Text>Product List</Text>
                            <Button
                                type="primary"
                                onClick={(e) => {
                                    //e.stopPropagation();
                                    setShowProductList(false);
                                }}
                            >
                                Add Shipping Address
                            </Button>
                        </Row>
                    }
                    bordered={false}
                    style={{ marginBottom: '24px' }}
                >
                    <Tabs
                        onChange={onChange}
                        type="card"
                        items={tabItems.map((value, index) => {
                            return {
                                label: value,
                                key: value,
                                children: (
                                    <Table columns={productListTableColumns} dataSource={datasource} rowKey="id" />
                                ),
                            };
                        })}
                    />
                </Card>
            ) : (
                <Card
                    title={
                        <Row justify="space-between">
                            <Text>Billing & Shipping Address</Text>
                            <Button
                                type="primary"
                                onClick={(e) => {
                                    //e.stopPropagation();
                                    setShowProductList(true);
                                }}
                            >
                                Show Product List
                            </Button>
                        </Row>
                    }
                    bordered={false}
                    style={{ marginBottom: '24px' }}
                >
                    <OrderAddressList />
                </Card>
            )}
        </>
    );
};

export default OrderProductList;
