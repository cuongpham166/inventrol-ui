import React from 'react';
import { Col, Row, Card, Typography } from 'antd';
import { ShoppingCartDel, Shopping, Funds, Return } from '@icon-park/react';
import CustomStatisticCard from 'components/common/CustomStatisticCard';

const PurchaseOverviewCard = (props) => {
    return (
        <Card bordered={false} title="Purchase Overview">
            <Row gutter={[24, 24]} style={{ marginBottom: '36px' }}>
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<Shopping theme="filled" className="dashboard_icon--large" />}
                        number="5"
                        text="Total Purchases"
                        color="purple"
                    />
                </Col>
                <Col span={12}>
                    <CustomStatisticCard
                        icon={<ShoppingCartDel theme="filled" className="dashboard_icon--large" />}
                        number="0"
                        text="Cancelled Purchase"
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
                        icon={<Return theme="filled" className="dashboard_icon--large" />}
                        number="0"
                        text="Returns"
                        color="cyan"
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default PurchaseOverviewCard;
