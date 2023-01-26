import React from 'react';
import { Col, Row, Space, Card, Typography, Tag } from 'antd';
import { ShoppingCartDel, Shopping, Funds, Return } from '@icon-park/react';
const { Text, Title } = Typography;
const PurchaseOverviewCard = (props) => {
    return (
        <Card bordered={false} title="Purchase Overview">
            <Row gutter={[24, 24]} style={{ marginBottom: '36px' }}>
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--large" color="purple">
                            <Shopping theme="filled" className="dashboard_icon--large" />
                        </Tag>

                        <Space direction="vertical" size={0}>
                            <Title level={3} className="dashboard_card_subtitle--large">
                                5
                            </Title>
                            <Text strong type="secondary">
                                Total Purchases
                            </Text>
                        </Space>
                    </Space>
                </Col>
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--large" color="magenta">
                            <ShoppingCartDel theme="filled" className="dashboard_icon--large" />
                        </Tag>

                        <Space direction="vertical" size={0}>
                            <Title level={3} className="dashboard_card_subtitle--large">
                                0
                            </Title>
                            <Text strong type="secondary">
                                Cancelled Purchase
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
                            <Return theme="filled" className="dashboard_icon--large" />
                        </Tag>

                        <Space direction="vertical" size={0}>
                            <Title level={3} className="dashboard_card_subtitle--large">
                                0
                            </Title>
                            <Text strong type="secondary">
                                Returns
                            </Text>
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default PurchaseOverviewCard;
