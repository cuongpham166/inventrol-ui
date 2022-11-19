import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Tabs, Typography, Space, Button, Select } from 'antd';
import { ShoppingCartOutlined, PlusOutlined } from '@ant-design/icons';
import * as service from '../../api/services';
import { $ } from 'moneysafe';
import ProductNameColumn from '../Product/ProductNameColumn';
const { Text, Title } = Typography;

const PurchaseProductList = (props) => {
    const [defaultDatasource, setDefaultDatasource] = useState([]);
    const [datasource, setDatasource] = useState([]);
    const [tabItems, setTabItems] = useState([]);
    const supplierId = props.supplierId;
    const getProductBySupplierId = async (supplierId) => {
        let result = await service.getAll('supplier/' + supplierId + '/purchase/add');
        result.sort((a, b) => {
            return a.id - b.id;
        });
        result.map((ele, index) => {
            ele.quantity = 0;
        });
        let tabItemSet = new Set();
        tabItemSet.add('All');
        result.map((value, index) => {
            tabItemSet.add(value.subcategory.category.name);
        });
        setTabItems([...tabItemSet]);
        setDatasource(result);
        setDefaultDatasource(result);
    };

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

    const handleAddProduct = (e, productId) => {
        let foundProduct = defaultDatasource.find((element) => element.id == productId);
        console.log(foundProduct);
        if (props.data.length == 0) {
            foundProduct.quantity = 1;
            return props.setCartData((prevState) => [...(prevState || []), foundProduct]);
        } else {
            let foundProductInCart = props.data.find((ele) => ele.id == productId);
            if (foundProductInCart) {
                //exist
                //increase quantity
                //setCartData
                let cartDataCopy = [...props.data];
                let updatedProductIndex = props.data.findIndex((ele) => ele.id == productId);
                let updatedProduct = props.data[updatedProductIndex];
                updatedProduct.quantity += 1;
                cartDataCopy[updatedProductIndex] = updatedProduct;
                return props.setCartData(cartDataCopy);
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
        getProductBySupplierId(supplierId);
    }, []);

    return (
        <>
            <Card title="Product List" bordered={false} style={{ marginBottom: '24px' }}>
                <Tabs
                    onChange={onChange}
                    type="card"
                    items={tabItems.map((value, index) => {
                        return {
                            label: value,
                            key: value,
                            children: <Table columns={productListTableColumns} dataSource={datasource} rowKey="id" />,
                        };
                    })}
                />
            </Card>
        </>
    );
};

export default PurchaseProductList;
