import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Tag, Popover, Button, Typography } from 'antd';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/Breadcrumb';

import useTopbar from 'utils/hooks/useTopbar';
import useDataTable from '../../utils/hooks/useDataTable';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as service from '../../api/services';

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
        render: (text, record) => <Link to={'/inventory/' + record.id}>{text}</Link>,
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
                    <Tag color={subcategory.category.tagColor}>{subcategory.category.name}</Tag>
                </Link>
                <br />
                <Link to={'/subcategory/' + subcategory.id}>
                    <Tag color={subcategory.tagColor}>{subcategory.name}</Tag>
                </Link>
            </div>
        ),
    },
    {
        title: 'Type',
        dataIndex: 'attributeValue',
        key: 'attributeValue',
        render: (attributeValue) => (
            <div>
                {attributeValue.map((attr) => {
                    return (
                        <Link to={'/attribute-value/' + attr.id}>
                            <Tag key={attr.id} color={attr.attribute.tagColor}>
                                {attr.name}
                            </Tag>
                        </Link>
                    );
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
        title: 'Retail Price (€)',
        dataIndex: 'retailPrice',
        key: 'retailPrice',
    },
    {
        title: 'Listing Price (€)',
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

const pageHeaderExtra = (
    <>
        <Link to={'/inventory/add'}>
            <Button key="1" type="primary" icon={<PlusOutlined />} style={{ textTransform: 'capitalize' }}>
                Create New Product
            </Button>
        </Link>
    </>
);

const ProductList = (props) => {
    const [dataTableSource, setDataTableSource] = useState([]);
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: columns,
        table: 'product',
        tableData: dataTableSource,
    });

    const getAllData = async () => {
        const result = await service.getAll('product');
        const tableData = result.filter((element) => element.deleted === false);
        setDataTableSource(tableData);
    };

    useEffect(() => {
        getAllData();
    }, []);

    const { PageHeader } = usePageHeader({
        title: 'List of Products',
        dataId: '',
        table: 'product',
        pageHeaderExtra: pageHeaderExtra,
    });

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            <Row>
                <PageHeader />
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
