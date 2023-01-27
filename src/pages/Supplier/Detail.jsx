import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import Breadcrumb from 'components/common/Breadcrumb';
import SupplierPurchaseChart from 'components/Supplier/SupplierDetail/SupplierPurchaseChart';
import SupplierPurchaseTimeline from 'components/Supplier/SupplierDetail/SupplierPurchaseTimeline';
import SupplierDatatStatistics from 'components/Supplier/SupplierDetail/SupplierDataStatistics';

import useDataTable from 'utils/hooks/useDataTable';

import * as service from '@services';
import * as supplierProps from '../Supplier/props';
import * as productProps from '../Product/props';

const { Title } = Typography;

const SupplierDetail = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const [pageHeaderMainContent, setPageHeaderMainContent] = useState([]);
    const [pageHeaderExtra, setPageHeaderExtra] = useState([]);

    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: productProps.productTableColumns,
        table: 'product',
        dataUrl: 'supplier/' + dataId + '/products',
    });

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            <Row gutter={[24, 24]}>
                <SupplierDatatStatistics />
            </Row>
            <Row gutter={[24, 24]} style={{ marginTop: '24px', marginBottom: '24px' }}>
                <Col span={16}>
                    <SupplierPurchaseChart />
                </Col>
                <Col span={8}>
                    <SupplierPurchaseTimeline supplierId={dataId} />
                </Col>
            </Row>
            <Row gutter={[24, 0]}>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="card_header">
                            <Title level={4}>Products</Title>
                        </div>
                        <div className="card_content">
                            <DataTable />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SupplierDetail;
