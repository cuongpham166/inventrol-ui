import React, { useMemo } from 'react';
import { Card, Table, Typography, Space, Divider, Col, Row, Tag } from 'antd';

import CustomDataTableCell from 'components/common/CustomDataTable/CustomDataTableCell';
import ProductStockStatusCard from 'components/Product/ProductStockStatusCard';

import { $ } from 'moneysafe';

const { Text, Title } = Typography;

const SupplierProductList = ({ data }) => {
    const productTableColumns = [
        {
            title: 'Id',
            key: 'index',
            render: (text, record, index) => record.id,
            width: 60,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <CustomDataTableCell data={record} type="product" />,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Retail Price',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            align: 'right',
            render: (retailPrice) => <Text>{$(retailPrice).toFixed()}</Text>,
        },
        {
            title: 'Status',
            dataIndex: 'productstock',
            key: 'productstock',
            render: (productstock) => <ProductStockStatusCard status={productstock.stockStatus} />,
            sorter: (a, b) => a.productstock.stockStatus.localeCompare(b.productstock.stockStatus),
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            render: (brand) => <Text>{brand.name}</Text>,
            sorter: (a, b) => a.brand.localeCompare(b.brand),
        },
        {
            title: 'Category',
            dataIndex: 'subcategory',
            key: 'subcategory',
            render: (subcategory) => <Text>{subcategory.category.name}</Text>,
            sorter: (a, b) => a.subcategory.category.name.localeCompare(b.subcategory.category.name),
        },
        {
            title: 'Subcategory',
            dataIndex: 'subcategory',
            key: 'subcategory',
            render: (subcategory) => <Text>{subcategory.name}</Text>,
            sorter: (a, b) => a.subcategory.name.localeCompare(b.subcategory.name),
        },
    ];

    return (
        <Card title={<Title level={5}>Products</Title>} bordered={false} style={{ height: '100%' }}>
            <Table columns={productTableColumns} dataSource={data} rowKey="id" />
        </Card>
    );
};

export default SupplierProductList;
