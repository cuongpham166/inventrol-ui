import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import Breadcrumb from 'components/common/Breadcrumb';
import SupplierPurchaseChart from 'components/Supplier/SupplierDetail/SupplierPurchaseChart';
import SupplierPurchaseTimeline from 'components/Supplier/SupplierDetail/SupplierPurchaseTimeline';

import SupplierProductStatistic from 'components/Supplier/SupplierDetail/SupplierProductStatistic';
import SupplierPurchaseStatistic from 'components/Supplier/SupplierDetail/SupplierPurchaseStatistic';

import SupplierInfo from 'components/Supplier/SupplierDetail/SupplierInfo';

import useDataTable from 'utils/hooks/useDataTable';

import * as service from '@services';
import * as supplierProps from '../Supplier/props';
import * as productProps from '../Product/props';

const { Title } = Typography;

const SupplierDetail = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

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
            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                <Col span={24}>
                    <SupplierInfo supplierId={dataId} />
                </Col>
            </Row>
            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                <Col span={17}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                                <Col span={24}>
                                    <SupplierPurchaseChart />
                                </Col>
                            </Row>
                            <Row gutter={[24, 24]}>
                                <Col span={24}>
                                    <Card bordered={false} title="Products">
                                        <DataTable />
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={7}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                                <Col span={24}>
                                    <SupplierPurchaseStatistic />
                                </Col>
                            </Row>
                            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                                <Col span={24}>
                                    <SupplierProductStatistic />
                                </Col>
                            </Row>

                            <Row gutter={[24, 24]}>
                                <Col span={24}>
                                    <SupplierPurchaseTimeline supplierId={dataId} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row gutter={[24, 0]}>
                <Col span={24}></Col>
            </Row>
        </>
    );
};

export default SupplierDetail;
