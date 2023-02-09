import React from 'react';
import { Col, Row, Space, Card, Typography, Tag } from 'antd';
import { ShoppingCart, ShoppingCartOne } from '@icon-park/react';
import CustomStatisticCard from 'components/common/CustomStatisticCard';

const SupplierPurchaseStatistic = (props) => {
    return (
        <Card bordered={false} title="Purchase Summary">
            <Row gutter={[12, 12]} justify="space-between">
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<ShoppingCart theme="filled" className="dashboard_icon--large" />}
                        number="5"
                        text="New Purchases"
                        color="purple"
                    />
                </Col>
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<ShoppingCartOne theme="filled" className="dashboard_icon--large" />}
                        number="5"
                        text="Total Purchases"
                        color="magenta"
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default SupplierPurchaseStatistic;
