import React from 'react';
import { Card, Typography, Segmented, Col, Row } from 'antd';
import { Column } from '@ant-design/plots';
import * as columnChartConfig from 'utils/config/charts/column';
const { Title } = Typography;
const heightLineChart = {
    height: 300,
};
const chartData = {
    data: [
        {
            type: 'Montag',
            sales: 38,
        },
        {
            type: 'Dienstag',
            sales: 52,
        },
        {
            type: 'Mittwoch',
            sales: 61,
        },
        {
            type: 'Donnerstag',
            sales: 145,
        },
        {
            type: 'Freitag',
            sales: 48,
        },
        {
            type: 'Samstag',
            sales: 38,
        },
        {
            type: 'Sonntag',
            sales: 38,
        },
    ],
};

const SupplierPurchaseChart = (props) => {
    const basicColumnChartConfig = { ...chartData, ...columnChartConfig.basicColumn, ...heightLineChart };
    return (
        <Card
            bordered={false}
            title={
                <Row>
                    <Col span={5}>
                        <Title level={5} className="dashboard_chart_title">
                            Purchases
                        </Title>
                    </Col>
                    <Col span={19} style={{ textAlign: 'right' }}>
                        <Segmented options={['Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
                    </Col>
                </Row>
            }
        >
            <Column {...basicColumnChartConfig} />
        </Card>
    );
};

export default SupplierPurchaseChart;
