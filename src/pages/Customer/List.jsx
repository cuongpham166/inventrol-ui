import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/Breadcrumb';

import * as service from '../../api/services';
import * as customerProps from '../Customer/props';

import useDataTable from '../../utils/hooks/useDataTable';
import usePageHeader from 'utils/hooks/usePageHeader';

const pageHeaderExtra = (
    <>
        <Link to={'/customer/add'}>
            <Button key="1" type="primary" icon={<PlusOutlined />} style={{ textTransform: 'capitalize' }}>
                Create New Customer
            </Button>
        </Link>
    </>
);

const CustomerList = (props) => {
    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: customerProps.customerTableColumns,
        table: 'customer',
        dataUrl: 'customer',
    });

    const { PageHeader } = usePageHeader({
        title: 'List of Customer',
        dataId: '',
        table: 'customer',
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

export default CustomerList;
