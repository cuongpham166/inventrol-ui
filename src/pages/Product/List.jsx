import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Tag, Popover, Button, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import * as service from '../../api/services';

import useTopbar from 'utils/hooks/useTopbar';
import useDataTable from '../../utils/hooks/useDataTable';

const { Title, Text } = Typography;

const columns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
        width: 60,
    },
    {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={'/product/' + record.id}>{text}</Link>,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
        render: (brand) => <Link to={'/brand/' + brand.id}>{brand.name}</Link>,
    },
    {
        title: 'Category',
        dataIndex: 'subcategory',
        key: 'subcategory',
        render: (subcategory) => (
            <div>
                <Link to={'/category/' + subcategory.category.id}>
                    <Tag color="#108ee9">{subcategory.category.name}</Tag>
                </Link>
                <br />
                <Link to={'/subcategory/' + subcategory.id}>
                    <Tag color="#f50">{subcategory.name}</Tag>
                </Link>
            </div>
        ),
    },
    {
        title: 'Tag',
        dataIndex: 'attributeValue',
        key: 'attributeValue',
        render: (attributeValue) => (
            <div>
                {attributeValue.map((attr) => {
                    return <Tag key={attr.id}>{attr.name}</Tag>;
                })}
            </div>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'stockStatus',
        key: 'stockStatus',
        render: (stockStatus) => {
            let tagColor = stockStatus === 'Out of Stock' ? 'red' : 'yellow';
            if (stockStatus === 'In Stock') {
                tagColor = 'green';
            }
            return <Tag color={tagColor}>{stockStatus.toUpperCase()}</Tag>;
        },
    },
    {
        title: 'Retail Price',
        dataIndex: 'retailPrice',
        key: 'retailPrice',
    },
    {
        title: 'Listing Price',
        dataIndex: 'listingPrice',
        key: 'listingPrice',
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
        render: (notice) => {
            let popoverContent = (
                <div>
                    <p>{notice}</p>
                </div>
            );
            return (
                <Popover content={popoverContent} title="Notice" placement="bottom">
                    <EyeOutlined />
                </Popover>
            );
        },
    },
];

const ProductList = (props) => {
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: columns,
        table: 'product',
    });

    const { Topbar } = useTopbar({
        title: 'List Of Products',
        dataId: '',
        table: 'product',
    });

    return (
        <>
            <Row gutter={[16, 16]}>
                <Topbar />
            </Row>

            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px', marginTop: '10px' }}>
                <Toolbar />
            </Row>

            <Row gutter={[16, 16]}>
                <DataTable />
            </Row>
        </>
    );
};

export default ProductList;
