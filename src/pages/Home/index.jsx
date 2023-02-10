import React from 'react';
import { Col, Row, Skeleton, Result } from 'antd';
import {
    PurchaseOverviewCard,
    PurchaseShippingOverviewCard,
    PurchaseShippingChart,
    OrderOverviewCard,
    InventorySummaryCard,
    MetadataSummaryCard,
    UserOverviewCard,
    OrderPurchaseChart,
    OrderPaymentChart,
    OrderShippingChart,
    TopPurchasedProductCard,
    TopOrderedProductCard,
    TopCustomerCard,
    TopSupplierCard,
} from 'components/Dashboard';
import 'assets/styles/dashboard.less';

import { useGetDashboardQuery } from 'features/api/apiSlice';
const DashboardPage = (props) => {
    let content;
    const { data: dashboard, isLoading, isSuccess, isError, error } = useGetDashboardQuery();
    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
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
                                <InventorySummaryCard
                                    totalProducts={dashboard.totalProducts}
                                    stockData={dashboard.stock}
                                />
                            </Col>
                            <Col span={12}>
                                <MetadataSummaryCard
                                    totalBrands={dashboard.totalBrands}
                                    totalCategories={dashboard.totalCategories}
                                    totalSubcategories={dashboard.totalSubcategories}
                                    totalAttributes={dashboard.totalAttributes}
                                />
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
                                        <UserOverviewCard
                                            totalCustomers={dashboard.totalCustomers}
                                            totalSuppliers={dashboard.totalSuppliers}
                                        />
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
                        <PurchaseShippingChart />
                    </Col>
                    <Col span={8}>
                        <OrderShippingChart />
                    </Col>
                    <Col span={8}>
                        <OrderPaymentChart />
                    </Col>
                </Row>
            </>
        );
    } else if (isError) {
        let errorStatus = `[${error.status}] - ${error.error}`;
        content = <Result status="warning" title={errorStatus} />;
    }

    return <>{content}</>;
};

export default DashboardPage;
