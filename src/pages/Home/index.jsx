import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import {
    PurchaseOverviewCard,
    PurchaseShippingOverviewCard,
    PurchasePaymentOverviewCard,
    OrderOverviewCard,
    InventorySummaryCard,
    ProductSummaryCard,
    UserSummaryCard,
    OrderPurchaseChart,
    OrderPaymentOverviewCard,
    OrderShippingOverviewCard,
    TopPurchasedProductCard,
    TopOrderedProductCard,
    TopCustomerCard,
    TopSupplierCard,
} from 'components/Dashboard';
import 'assets/styles/dashboard.less';
const DashboardPage = (props) => {
    return (
        <>
            <Row gutter={[24, 24]} style={{}}>
                <Col span={14}>
                    <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                        <Col span={24}>
                            <OrderPurchaseChart />
                        </Col>
                    </Row>
                    <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                        <Col span={12}>
                            <InventorySummaryCard />
                        </Col>
                        <Col span={12}>
                            <ProductSummaryCard />
                        </Col>
                    </Row>
                </Col>
                <Col span={10}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                                <Col span={24}>
                                    <PurchaseOverviewCard />
                                </Col>
                            </Row>
                            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                                <Col span={24}>
                                    <OrderOverviewCard />
                                </Col>
                            </Row>
                            <Row gutter={[24, 24]}>
                                <Col span={24}>
                                    <UserSummaryCard />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                <Col span={14}></Col>
                <Col span={10}>
                    <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                        <Col span={24}>
                            <TopPurchasedProductCard />
                        </Col>
                    </Row>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <TopOrderedProductCard />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                <Col span={8}>
                    <PurchaseShippingOverviewCard />
                </Col>
                <Col span={8}>
                    <OrderShippingOverviewCard />
                </Col>
                <Col span={8}>
                    <OrderPaymentOverviewCard />
                </Col>
            </Row>
        </>
    );
};

export default DashboardPage;
