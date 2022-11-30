import React from 'react';
import { Col, Row, Button, Card, Space, Typography, Tag } from 'antd';
import { HashtagKey, TagOne, Rss, Tag as TagIcon } from '@icon-park/react';

const { Text, Title } = Typography;
const ProductSummaryCard = (props) => {
    return (
        <Card bordered={false} title="Product Summary">
            <Row gutter={[24, 24]} style={{ marginBottom: '12px' }}>
                <Col span={14}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--small" color="purple">
                            <TagOne theme="filled" className="dashboard_icon--small" />
                        </Tag>
                        <Text strong type="secondary">
                            Total Brands
                        </Text>
                    </Space>
                </Col>
                <Col span={10}>
                    <Title level={3} className="dashboard_card_subtitle--small">
                        5
                    </Title>
                </Col>
            </Row>
            <Row gutter={[24, 24]} style={{ marginBottom: '12px' }}>
                <Col span={14}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--small" color="success">
                            <TagIcon theme="filled" className="dashboard_icon--small" />
                        </Tag>
                        <Text strong type="secondary">
                            Total Categories
                        </Text>
                    </Space>
                </Col>
                <Col span={10}>
                    <Title level={3} className="dashboard_card_subtitle--small">
                        5
                    </Title>
                </Col>
            </Row>
            <Row gutter={[24, 24]} style={{ marginBottom: '12px' }}>
                <Col span={14}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--small" color="warning">
                            <Rss theme="filled" className="dashboard_icon--small" />
                        </Tag>
                        <Text strong type="secondary">
                            Total Subcategories
                        </Text>
                    </Space>
                </Col>
                <Col span={10}>
                    <Title level={3} className="dashboard_card_subtitle--small">
                        5
                    </Title>
                </Col>
            </Row>
            <Row gutter={[24, 24]}>
                <Col span={14}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--small" color="error">
                            <HashtagKey theme="filled" className="dashboard_icon--small" />
                        </Tag>
                        <Text strong type="secondary">
                            Total Attributes
                        </Text>
                    </Space>
                </Col>
                <Col span={10}>
                    <Title level={3} className="dashboard_card_subtitle--small">
                        5
                    </Title>
                </Col>
            </Row>
        </Card>
    );
};

export default ProductSummaryCard;
