import React from 'react';
import { Col, Row, Space, Card, Typography, Tag } from 'antd';
import { PeoplesTwo, Peoples } from '@icon-park/react';
const { Title, Text } = Typography;
const UserSummaryCard = (props) => {
    return (
        <Card bordered={false} title="User Summary">
            <Row gutter={[12, 12]} justify="space-between">
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--large" color="blue">
                            <PeoplesTwo theme="filled" className="dashboard_icon--large" />
                        </Tag>

                        <Space direction="vertical" size={0}>
                            <Title level={3} className="dashboard_card_subtitle--large">
                                5
                            </Title>
                            <Text strong type="secondary">
                                Total Suppliers
                            </Text>
                        </Space>
                    </Space>
                </Col>
                <Col span={12}>
                    <Space size={12}>
                        <Tag className="dashboard_icon_container--large" color="geekblue">
                            <PeoplesTwo theme="filled" className="dashboard_icon--large" />
                        </Tag>

                        <Space direction="vertical" size={0}>
                            <Title level={3} className="dashboard_card_subtitle--large">
                                5
                            </Title>
                            <Text strong type="secondary">
                                Total Customers
                            </Text>
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default UserSummaryCard;
