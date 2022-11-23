import React from 'react';
import { Card, Space, Typography, Row } from 'antd';
import { ReactComponent as DpdIcon } from 'assets/icons/dpd.svg';
const { Text, Title } = Typography;
const PurchaseShipping = (props) => {
    return (
        <Card title="Shipping Details" bordered={false} style={{ marginTop: '24px' }}>
            <Row justify="center" align="middle">
                <DpdIcon />
                <Text>09447661271834</Text>
            </Row>
        </Card>
    );
};

export default PurchaseShipping;
