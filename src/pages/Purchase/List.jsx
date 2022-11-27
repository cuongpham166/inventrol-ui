import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/common/Breadcrumb';

import useDataTable from '../../utils/hooks/useDataTable';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as service from '../../api/services';
import * as purchaseProps from '../Purchase/props';

const PurchaseList = (props) => {
    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: purchaseProps.purchaseTableColumns,
        table: 'purchase',
        dataUrl: 'purchase',
    });

    const { PageHeader } = usePageHeader({
        title: 'List of Purchases',
        dataId: '',
        table: 'purchase',
        pageHeaderExtra: <></>,
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

export default PurchaseList;
