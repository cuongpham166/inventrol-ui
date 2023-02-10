import React from 'react';
import { Col, Row, Result, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';

import Breadcrumb from 'components/common/Breadcrumb';
import SupplierPurchaseChart from 'components/Supplier/SupplierDetail/SupplierPurchaseChart';
import SupplierPurchaseTimeline from 'components/Supplier/SupplierDetail/SupplierPurchaseTimeline';
import SupplierProductStatistic from 'components/Supplier/SupplierDetail/SupplierProductStatistic';
import SupplierPurchaseStatistic from 'components/Supplier/SupplierDetail/SupplierPurchaseStatistic';
import SupplierInfo from 'components/Supplier/SupplierDetail/SupplierInfo';
import SupplierProductList from 'components/Supplier/SupplierDetail/SupplierProductList';

import { useGetSupplierQuery } from 'features/api/apiSlice';

const SupplierDetail = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    let content;
    const { data: supplier, isLoading, isSuccess, isError, error } = useGetSupplierQuery(dataId);

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <>
                <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                    <Col span={24}>
                        <SupplierInfo supplierData={supplier} />
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
                                        <SupplierProductList data={supplier.product} />
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
            </>
        );
    } else if (isError) {
        let errorStatus = `[${error.status}] - ${error.error}`;
        content = <Result status="warning" title={errorStatus} />;
    }

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            {content}
        </>
    );
};

export default SupplierDetail;
