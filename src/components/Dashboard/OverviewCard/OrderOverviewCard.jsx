import React from 'react';
import { Col, Row, Space, Card, Typography, Tag } from 'antd';
import { Trend, TrendTwo, TransactionOrder, Funds } from '@icon-park/react';

import CustomStatisticCard from 'components/common/CustomStatisticCard';

const { Text, Title } = Typography;
const OrderOverviewCard = (props) => {
    return (
        <Card bordered={false} title="Order Overview">
            <Row gutter={[24, 24]} style={{ marginBottom: '36px' }}>
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<TransactionOrder theme="filled" className="dashboard_icon--large" />}
                        number="5"
                        text="Total Orders"
                        color="purple"
                    />
                </Col>
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<Trend theme="filled" className="dashboard_icon--large" />}
                        number="0"
                        text="Revenue"
                        color="magenta"
                    />
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<Funds theme="filled" className="dashboard_icon--large" />}
                        number="250,00€"
                        text="Total Cost"
                        color="gold"
                    />
                </Col>
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<TrendTwo theme="filled" className="dashboard_icon--large" />}
                        number="0"
                        text="Profit"
                        color="cyan"
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default OrderOverviewCard;
