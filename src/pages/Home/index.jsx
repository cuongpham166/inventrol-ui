import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import {
    PurchaseOverviewCard,
    OrderOverviewCard,
    InventorySummaryCard,
    ProductSummaryCard,
    UserSummaryCard,
    OrderPurchaseChart,
    OrderPaymentOverviewCard,
    OrderShippingOverviewCard,
} from 'components/Dashboard';
const DashboardPage = (props) => {
    return (
        <>
            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                <Col span={12}>
                    <PurchaseOverviewCard />
                </Col>
                <Col span={12}>
                    <OrderOverviewCard />
                </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                <Col span={8}>
                    <InventorySummaryCard />
                </Col>
                <Col span={8}>
                    <ProductSummaryCard />
                </Col>
                <Col span={8}>
                    <UserSummaryCard />
                </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                <Col span={24}>
                    <OrderPurchaseChart />
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <OrderPaymentOverviewCard />
                </Col>
                <Col span={12}>
                    <OrderShippingOverviewCard />
                </Col>
            </Row>
        </>
    );
};

export default DashboardPage;
