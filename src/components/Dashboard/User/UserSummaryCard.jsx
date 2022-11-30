import React from 'react';
import { Col, Row, Space, Card, Typography, Tag } from 'antd';
import { PeoplesTwo, Peoples } from '@icon-park/react';
const { Title, Text } = Typography;
const UserSummaryCard = (props) => {
    return (
        <Card bordered={false} title="No. of users">
            <Row gutter={[12, 12]} justify="space-between">
                <Col span={12}>
                    <Card style={{ backgroundColor: '#f9f9f9' }}>
                        <Space direction="vertical" align="center" size={8} style={{ width: '100%' }}>
                            <Tag className="dashboard_icon_container--vertical" color="blue">
                                <PeoplesTwo theme="filled" size="24" className="dashboard_icon--vertical" />
                            </Tag>

                            <Text strong type="secondary" className="dashboard_card_title--vertical">
                                Total Suppliers
                            </Text>
                            <Title level={2} className="dashboard_card_subtitle--vertical">
                                5
                            </Title>
                        </Space>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{ backgroundColor: '#f9f9f9' }}>
                        <Space direction="vertical" align="center" size={8} style={{ width: '100%' }}>
                            <Tag className="dashboard_icon_container--vertical" color="geekblue">
                                <Peoples theme="filled" size="24" className="dashboard_icon--vertical" />
                            </Tag>
                            <Text strong type="secondary" className="dashboard_card_title--vertical">
                                Total Customers
                            </Text>
                            <Title level={2} className="dashboard_card_subtitle--vertical">
                                5
                            </Title>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default UserSummaryCard;
