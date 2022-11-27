import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Tabs, List } from 'antd';
import { useParams, Link } from 'react-router-dom';
import * as service from '@services';

import PurchaseHistory from 'components/Purchase/PurchaseDetail/PurchaseHistory';
import PurchaseItemList from 'components/Purchase/PurchaseDetail/PurchaseItemList';
import PurchaseSupplier from 'components/Purchase/PurchaseDetail/PurchaseSupplier';
import PurchaseShipping from 'components/Purchase/PurchaseDetail/PurchaseShipping';
import Breadcrumb from 'components/common/Breadcrumb';

import usePageHeader from 'utils/hooks/usePageHeader';

const PurchaseDetail = (props) => {
    const [datasource, setDataSource] = useState({});
    const { id } = useParams();
    const dataId = parseInt(id);

    const getPurchaseDataById = async (dataId) => {
        let purchaseDataRes = await service.getById('purchase', dataId);
        setDataSource(purchaseDataRes);
    };

    const { PageHeader } = usePageHeader({
        title: '',
        dataId: dataId,
        table: 'purchase',
        pageHeaderExtra: <></>,
    });

    useEffect(() => {
        getPurchaseDataById(dataId);
    }, []);

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            <Row>
                <PageHeader />
            </Row>
            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                <Col span={19}>
                    <PurchaseItemList data={datasource} />
                </Col>
                <Col span={5}>
                    <PurchaseHistory data={datasource.purchasehistory} />
                    <PurchaseShipping data={datasource.purchaseshipping} />
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <PurchaseSupplier data={datasource.supplier} />
                </Col>
            </Row>
        </>
    );
};

export default PurchaseDetail;
