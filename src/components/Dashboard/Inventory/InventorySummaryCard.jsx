import React from 'react';
import { Col, Row, Button, Card, Space, Typography, Tag } from 'antd';
import { ArrowCircleUp, AdProduct, CircleRightDown, ArrowCircleDown } from '@icon-park/react';

const { Text, Title } = Typography;

const InventorySummaryCard = (props) => {
    return (
        <Card bordered={false} title="Inventory Summary">
            <Row gutter={[24, 24]} style={{ marginBottom: '12px' }}>
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--small" color="purple">
                            <AdProduct theme="filled" className="dashboard_icon--small" />
                        </Tag>
                        <Text strong type="secondary">
                            Total Products
                        </Text>
                    </Space>
                </Col>
                <Col span={12}>
                    <Title level={3} className="dashboard_card_subtitle--small">
                        5
                    </Title>
                </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginBottom: '12px' }}>
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--small" color="success">
                            <ArrowCircleUp theme="filled" className="dashboard_icon--small" />
                        </Tag>
                        <Text strong type="secondary">
                            In Stock
                        </Text>
                    </Space>
                </Col>
                <Col span={12}>
                    <Title level={3} className="dashboard_card_subtitle--small">
                        5
                    </Title>
                </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginBottom: '12px' }}>
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--small" color="warning">
                            <CircleRightDown theme="filled" className="dashboard_icon--small" />
                        </Tag>
                        <Text strong type="secondary">
                            Low in Stock
                        </Text>
                    </Space>
                </Col>
                <Col span={12}>
                    <Title level={3} className="dashboard_card_subtitle--small">
                        5
                    </Title>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--small" color="error">
                            <ArrowCircleDown theme="filled" className="dashboard_icon--small" />
                        </Tag>
                        <Text strong type="secondary">
                            Out of Stock
                        </Text>
                    </Space>
                </Col>
                <Col span={12}>
                    <Title level={3} className="dashboard_card_subtitle--small">
                        5
                    </Title>
                </Col>
            </Row>
        </Card>
    );
};

export default InventorySummaryCard;
