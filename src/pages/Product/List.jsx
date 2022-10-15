import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Typography, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/Breadcrumb';

import useDataTable from '../../utils/hooks/useDataTable';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as service from '../../api/services';
import * as productProps from '../Product/props';

const { Title, Text } = Typography;

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
        columns: productProps.productTableColumns,
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

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="card_content">
                            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px' }}>
                                <Toolbar />
                            </Row>
                            <DataTable />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductList;
