import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Tabs, Typography, Space, Button, InputNumber } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import * as service from '../../api/services';
const { Text, Title } = Typography;

const ProductNameColumn = ({ data }) => {
    let text = '';
    data.attributeValue.map((value) => {
        text += value.name;
    });
    return (
        <Space direction="vertical" size={0}>
            <Text>{data.brand.name}</Text>
            <Text strong>{data.name}</Text>
            <Text>{data.barcode}</Text>
            <Text>{text}</Text>
        </Space>
    );
};

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
            title: 'Subcategory',
            dataIndex: 'subcategory',
            key: 'subcategory',
            render: (subcategory) => <Tag color={subcategory.tagColor}>{subcategory.name}</Tag>,
        },
        {
            title: 'Price',
            dataIndex: 'listingPrice',
            key: 'listingPrice',
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
                    onClick={(e) => {
                        //e.stopPropagation();
                        handleAddProduct(e, record.id);
                    }}
                >
                    Add
                </Button>
            ),
        },
    ];

    const handleAddProduct = (e, productId) => {
        let foundProduct = defaultDatasource.find((element) => element.id == productId);
        foundProduct['quantity'] = 1;
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
