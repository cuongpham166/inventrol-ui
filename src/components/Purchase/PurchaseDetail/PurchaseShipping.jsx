import React from 'react';
import { Card, Space, Typography, Row } from 'antd';
import Barcode from 'react-barcode';
import dhl from 'assets/icons/dhl.png';
import dpd from 'assets/icons/dpd.png';
import fedex from 'assets/icons/fedex.png';
import gls from 'assets/icons/gls.png';
import hermes from 'assets/icons/hermes.png';
import ups from 'assets/icons/ups.png';
import * as dayjs from 'dayjs';
const { Text, Title } = Typography;
const PurchaseShipping = (props) => {
    let shippingData = props.data;
    let shippingContent;
    if (shippingData != undefined) {
        if (shippingData.service == null || shippingData.trackingNumber == null) {
            shippingContent = <Title level={5}>Not Available</Title>;
        } else {
            let shippingIcon;
            switch (shippingData.service) {
                case 'DHL':
                    shippingIcon = dhl;
                    break;
                case 'DPD':
                    shippingIcon = dpd;
                    break;
                case 'Fedex':
                    shippingIcon = fedex;
                    break;
                case 'GLS':
                    shippingIcon = gls;
                    break;
                case 'Hermes':
                    shippingIcon = hermes;
                    break;
                case 'UPS':
                    shippingIcon = ups;
                    break;
                default:
                    break;
            }
            shippingContent = (
                <Row justify="center" align="middle">
                    <Space direction="vertical" style={{ textAlign: 'center' }} size={0}>
                        <img src={shippingIcon} alt="icon" style={{ width: '150px' }} />
                        <Text type="secondary">Scan barcode to track</Text>
                        <Barcode value={shippingData.trackingNumber} width={1.5} />
                        <Text type="secondary">Last update: {dayjs(shippingData.updatedOn).format('DD/MM/YYYY')}</Text>
                    </Space>
                </Row>
            );
        }
    }
    return (
        <Card title="Shipping Details" bordered={false} style={{ marginTop: '24px' }}>
            {shippingContent}
        </Card>
    );
};

export default PurchaseShipping;
