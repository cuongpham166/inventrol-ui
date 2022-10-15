import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/Breadcrumb';

import useDataTable from '../../utils/hooks/useDataTable';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as service from '../../api/services';
import * as subcategoryProps from '../Subcategory/props';

const pageHeaderExtra = (
    <>
        <Link to={'/subcategory/add'}>
            <Button key="1" type="primary" icon={<PlusOutlined />} style={{ textTransform: 'capitalize' }}>
                Create New Subcategory
            </Button>
        </Link>
    </>
);

const SubcategoryList = (props) => {
    const [dataTableSource, setDataTableSource] = useState([]);
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: subcategoryProps.subcategoryTableColumns,
        table: 'subcategory',
        tableData: dataTableSource,
    });

    const { PageHeader } = usePageHeader({
        title: 'List of Subcategories',
        dataId: '',
        table: 'subcategory',
        pageHeaderExtra: pageHeaderExtra,
    });

    const getAllData = async () => {
        const result = await service.getAll('subcategory');
        const tableData = result.filter((element) => element.deleted === false);
        setDataTableSource(tableData);
    };

    useEffect(() => {
        getAllData();
    }, []);

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

export default SubcategoryList;
