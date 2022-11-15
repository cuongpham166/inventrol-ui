import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Tabs, Typography, Space, Button, Select } from 'antd';
import { ShoppingCartOutlined, PlusOutlined } from '@ant-design/icons';
import * as service from '../../api/services';
import ProductNameColumn from 'components/Product/ProductNameColumn';
import { $ } from 'moneysafe';
const { Text, Title } = Typography;

const OrderProductList = (props) => {
    const [defaultDatasource, setDefaultDatasource] = useState([]);
    const [datasource, setDatasource] = useState([]);
    const [tabItems, setTabItems] = useState([]);
    const getAllProducts = async () => {
        let result = await service.getAll('product');
        let products = result.filter((element) => element.productstock.quantity > 0);
        console.log(products);
        products.sort((a, b) => {
            return a.id - b.id;
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
            render: (vat) => <Text>{$(vat * 100).toFixed() + '%'} </Text>,
        },
        {
            title: 'Price',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            align: 'center',
            render: (retailPrice) => <Text>{$(retailPrice).toFixed()} </Text>,
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
        return props.setCartData((prevState) => [...(prevState || []), foundProduct]);
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

export default OrderProductList;
