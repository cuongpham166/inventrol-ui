import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/Breadcrumb';

import useDataTable from '../../utils/hooks/useDataTable';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as service from '../../api/services';
import * as attributeProps from '../Attribute/props';

const pageHeaderExtra = (
    <>
        <Link to={'/attribute/add'}>
            <Button key="1" type="primary" icon={<PlusOutlined />} style={{ textTransform: 'capitalize' }}>
                Create New Attribute
            </Button>
        </Link>
    </>
);
const AttributeList = (props) => {
    const [dataTableSource, setDataTableSource] = useState([]);
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: attributeProps.attributeTableColumns,
        table: 'attribute',
        tableData: dataTableSource,
    });

    const { PageHeader } = usePageHeader({
        title: 'List of Attributes',
        dataId: '',
        table: 'attribute',
        pageHeaderExtra: pageHeaderExtra,
    });

    const getAllData = async () => {
        const result = await service.getAll('attribute');
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

export default AttributeList;
