import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Table, Card, Tag, Tabs, Typography, Space, Button, Select, Result, Skeleton } from 'antd';
import { ShoppingCartOutlined, PlusOutlined } from '@ant-design/icons';
import * as service from '../../../api/services';
import { $ } from 'moneysafe';
import ProductNameColumn from '../../Product/ProductNameColumn';

import { useGetPurchaseProductBySupplierQuery } from 'features/api/apiSlice';

import { PurchaseCartContext } from 'pages/Supplier/NewPurchase';

const { Text, Title } = Typography;

const PurchaseProductList = (props) => {
    let content;
    const supplierId = props.supplierId;

    const [selectedOption, setSelectedOption] = useState('All');

    const { cartData, setCartData } = useContext(PurchaseCartContext);

    const {
        data: products = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPurchaseProductBySupplierQuery(supplierId);

    const selectOptionList = useMemo(() => {
        let productList = products.slice();
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
            render: (text, record) => <ProductNameColumn data={record} />,
        },
        {
            title: 'Price',
            dataIndex: 'listingPrice',
            key: 'listingPrice',
            align: 'center',
            render: (listingPrice) => <Text>{$(listingPrice).toFixed()} </Text>,
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

    const handleAddProduct = (e, productId) => {
        let foundProduct = sortedProducts.find((element) => element.id == productId);

        if (cartData.length == 0) {
            foundProduct.quantity = 1;
            return setCartData((prevState) => [...(prevState || []), foundProduct]);
        } else {
            let foundProductInCart = cartData.find((ele) => ele.id == productId);
            if (foundProductInCart) {
                //exist
                //increase quantity
                //setCartData
                let cartDataCopy = [...cartData];
                let updatedProductIndex = cartData.findIndex((ele) => ele.id == productId);
                let updatedProduct = cartData[updatedProductIndex];
                updatedProduct.quantity += 1;
                cartDataCopy[updatedProductIndex] = updatedProduct;
                return setCartData(cartDataCopy);
            } else {
                //not exist
                //set quantity = 1
                //setCartData
                foundProduct.quantity = 1;
                return setCartData((prevState) => [...(prevState || []), foundProduct]);
            }
        }
    };

    return (
        <>
            <Card title="Product List" bordered={false} style={{ marginBottom: '24px' }}>
                {content}
            </Card>
        </>
    );
};

export default PurchaseProductList;
