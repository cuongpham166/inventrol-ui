import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';

import PurchaseHistory from './PurchaseHistory';
import PurchaseItemList from './PurchaseItemList';
import PurchaseShipping from './PurchaseShipping';
import PurchaseSupplier from './PurchaseSupplier';

const PurchaseDetailComponent = ({ datasource }) => {
    return (
        <>
            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                <Col span={24}>
                    <PurchaseSupplier data={datasource.supplier} />
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col span={19}>
                    <PurchaseItemList data={datasource} />
                </Col>
                <Col span={5}>
                    <PurchaseHistory data={datasource.purchasehistory} />
                    <PurchaseShipping data={datasource.purchaseshipping} />
                </Col>
            </Row>
        </>
    );
};

export default PurchaseDetailComponent;
