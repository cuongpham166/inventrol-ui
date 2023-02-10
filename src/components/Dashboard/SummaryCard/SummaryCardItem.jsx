import React from 'react';
import { Col, Row, Button, Card, Space, Typography, Tag } from 'antd';
const { Text, Title } = Typography;
const SummaryCardItem = ({ color, icon, text, number }) => {
    return (
        <Row gutter={[24, 24]} style={{ marginBottom: '12px' }}>
            <Col span={16}>
                <Space size={12}>
                    <Tag className="dashboard_icon_container--small" color={color}>
                        {icon}
                    </Tag>
                    <Text>{text}</Text>
                </Space>
            </Col>
            <Col span={8}>
                <Title level={3} className="dashboard_card_subtitle--small">
                    {number}
                </Title>
            </Col>
        </Row>
    );
};

export default SummaryCardItem;
