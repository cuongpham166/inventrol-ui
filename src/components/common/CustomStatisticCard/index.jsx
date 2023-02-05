import React from 'react';
import { Col, Row, Space, Card, Typography, Tag } from 'antd';
import { ShoppingCartDel, Shopping, Funds, Return } from '@icon-park/react';
const { Text, Title } = Typography;
const CustomStatisticCard = ({ icon, number, text, color }) => {
    return (
        <>
            <Space size={12}>
                <Tag className="dashboard_icon_container--large" color={color}>
                    {icon}
                </Tag>

                <Space direction="vertical" size={0}>
                    <Title level={3} className="dashboard_card_subtitle--large">
                        {number}
                    </Title>
                    <Text strong type="secondary">
                        {text}
                    </Text>
                </Space>
            </Space>
        </>
    );
};

export default CustomStatisticCard;
