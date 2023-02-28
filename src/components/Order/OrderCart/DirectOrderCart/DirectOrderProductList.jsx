import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Table, Card, Tag, Tooltip, Typography, Space, Button, Select, Result, Skeleton } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { $ } from 'moneysafe';
import { $$, subtractPercent, addPercent } from 'moneysafe/ledger';

import { useGetProductsQuery } from 'features/api/apiSlice';
import { DirectOrderCartContext } from 'pages/Order/DirectOrder/NewDirectOrder';

const { Text, Title } = Typography;

const DirectOrderProductList = (props) => {
    let content;

    const [selectedOption, setSelectedOption] = useState('All');

    const { directOrderCartData, setDirectOrderCartData } = useContext(DirectOrderCartContext);

    const { data: products = [], isLoading, isSuccess, isError, error } = useGetProductsQuery();

    const selectOptionList = useMemo(() => {
        let productList = products.slice();
        productList = productList.filter((element) => element.productstock.quantity > 0);
        productList.sort((a, b) => a.subcategory.category.name - b.subcategory.category.name);
        let itemSet = new Set();
        itemSet.add('All');
        productList.map((value, index) => {
            itemSet.add(value.subcategory.category.name);
        });

        let tempList = [...itemSet];
        let optionList = [];

        tempList.map((val, idx) => {
            let ele = { value: val, label: val };
            optionList.push(ele);
        });
        return optionList;
    }, [products]);

    const sortedProducts = useMemo(() => {
        let productList;
        let tempList = products.slice();
        tempList = tempList.filter((element) => element.productstock.quantity > 0);
        tempList.sort((a, b) => b.id - a.id);
        tempList = tempList.map((item) => ({
            ...item,
            quantity: 0,
        }));

        if (selectedOption != 'All') {
            productList = tempList.filter((value) => value.subcategory.category.name === selectedOption);
        } else {
            productList = tempList;
        }

        return productList;
    }, [products, selectedOption]);

    const productListTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <Text>{record.brand.name}</Text>
                    <Text strong>
                        {record.name} - {record.attributeValue[0].name}
                    </Text>
                </Space>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text, record, index) => <Tag color={record.subcategory.tagColor}>{record.subcategory.name}</Tag>,
        },
        {
            title: 'VAT',
            dataIndex: 'vat',
            key: 'vat',
            align: 'right',
            render: (vat) => <Text>{vat}%</Text>,
        },
        {
            title: 'Discount',
            dataIndex: '%',
            key: '%',
            align: 'right',
            render: (text, record, index) => (
                <>{record.discount.discountPercent > 0 ? <Text>{record.discount.discountPercent}%</Text> : <></>}</>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            align: 'right',
            render: (text, record, index) => (
                <>
                    {record.discount.discountPercent > 0 ? (
                        <Space direction="vertical">
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

    const handleChangeOption = (value) => {
        setSelectedOption(value);
    };

    const handleAddProduct = (e, productId) => {
        let foundProduct = sortedProducts.find((element) => element.id == productId);
        if (directOrderCartData.length == 0) {
            foundProduct.quantity = 1;
            return setDirectOrderCartData((prevState) => [...(prevState || []), foundProduct]);
        } else {
            let foundProductInCart = directOrderCartData.find((ele) => ele.id == productId);
            if (foundProductInCart) {
                if (foundProduct.quantity < foundProduct.productstock.quantity) {
                    let cartDataCopy = [...directOrderCartData];
                    let updatedProductIndex = directOrderCartData.findIndex((ele) => ele.id == productId);
                    let updatedProduct = directOrderCartData[updatedProductIndex];
                    updatedProduct.quantity += 1;
                    cartDataCopy[updatedProductIndex] = updatedProduct;
                    return setDirectOrderCartData(cartDataCopy);
                }
            } else {
                //not exist
                //set quantity = 1
                //setCartData
                foundProduct.quantity = 1;
                return setDirectOrderCartData((prevState) => [...(prevState || []), foundProduct]);
            }
        }
    };

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <>
                <Space style={{ marginBottom: '20px' }}>
                    Category
                    <Select
                        defaultValue="All"
                        style={{ width: 120 }}
                        options={selectOptionList}
                        onChange={handleChangeOption}
                    />
                </Space>

                <Table columns={productListTableColumns} dataSource={sortedProducts} rowKey="id" />
            </>
        );
    } else if (isError) {
        let errorStatus = `[${error.status}] - ${error.error}`;
        content = <Result status="warning" title={errorStatus} />;
    }

    return (
        <>
            <Card title="Product List" bordered={false} style={{ marginBottom: '24px' }}>
                {content}
            </Card>
        </>
    );
};

export default DirectOrderProductList;
