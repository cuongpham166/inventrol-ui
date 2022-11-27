import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/common/Breadcrumb';

import useDataTable from '../../utils/hooks/useDataTable';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as service from '../../api/services';
import * as supplierProps from '../Supplier/props';

const pageHeaderExtra = (
    <>
        <Link to={'/supplier/add'}>
            <Button key="1" type="primary" icon={<PlusOutlined />} style={{ textTransform: 'capitalize' }}>
                Create New Supplier
            </Button>
        </Link>
    </>
);

const SupplierList = (props) => {
    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: supplierProps.supplierTableColumns,
        table: 'supplier',
        dataUrl: 'supplier',
    });

    const { PageHeader } = usePageHeader({
        title: 'List of Suppliers',
        dataId: '',
        table: 'supplier',
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
                            <DataTable />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SupplierList;
