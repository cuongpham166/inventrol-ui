import React from 'react';
import { Col, Row, Space, Card, Typography, Tag } from 'antd';
import { Trend, TrendTwo, TransactionOrder, Funds } from '@icon-park/react';

const { Text, Title } = Typography;
const OrderOverviewCard = (props) => {
    return (
        <Card bordered={false} title="Order Overview">
            <Row gutter={[24, 24]} style={{ marginBottom: '36px' }}>
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--large" color="purple">
                            <TransactionOrder theme="filled" className="dashboard_icon--large" />
                        </Tag>

                        <Space direction="vertical" size={0}>
                            <Title level={3} className="dashboard_card_subtitle--large">
                                5
                            </Title>
                            <Text strong type="secondary">
                                Total Orders
                            </Text>
                        </Space>
                    </Space>
                </Col>
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--large" color="magenta">
                            <Trend theme="filled" className="dashboard_icon--large" />
                        </Tag>

                        <Space direction="vertical" size={0}>
                            <Title level={3} className="dashboard_card_subtitle--large">
                                0
                            </Title>
                            <Text strong type="secondary">
                                Revenue
                            </Text>
                        </Space>
                    </Space>
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--large" color="gold">
                            <Funds theme="filled" className="dashboard_icon--large" />
                        </Tag>

                        <Space direction="vertical" size={0}>
                            <Title level={3} className="dashboard_card_subtitle--large">
                                250,00€
                            </Title>
                            <Text strong type="secondary">
                                Total Cost
                            </Text>
                        </Space>
                    </Space>
                </Col>
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--large" color="cyan">
                            <TrendTwo theme="filled" className="dashboard_icon--large" />
                        </Tag>

                        <Space direction="vertical" size={0}>
                            <Title level={3} className="dashboard_card_subtitle--large">
                                0
                            </Title>
                            <Text strong type="secondary">
                                Profit
                            </Text>
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default OrderOverviewCard;
