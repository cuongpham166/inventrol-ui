import React from 'react';
import { Card, Space, Typography, Row, QRCode } from 'antd';

import * as dayjs from 'dayjs';
const { Text, Title } = Typography;
const PurchaseShipping = (props) => {
    let shippingData = props.data;
    let shippingContent;
    if (shippingData != undefined) {
        if (shippingData.service == null || shippingData.trackingNumber == null) {
            shippingContent = <Title level={5}>Not Available</Title>;
        } else {
            shippingContent = (
                <Row justify="center" align="middle">
                    <Space direction="vertical" style={{ textAlign: 'center' }} size={0}>
                        <Text type="secondary">Scan QR Code to track</Text>
                        <QRCode value={shippingData.trackingNumber} bordered={false} />;
                        <Text type="secondary">Last update: {dayjs(shippingData.updatedOn).format('DD/MM/YYYY')}</Text>
                    </Space>
                </Row>
            );
        }
    }
    return (
        <Card title="Tracking" bordered={false} style={{ marginTop: '24px' }}>
            {shippingContent}
        </Card>
    );
};

export default PurchaseShipping;
