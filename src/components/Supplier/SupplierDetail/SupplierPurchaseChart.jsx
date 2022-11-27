import React from 'react';
import { Card, Typography, Segmented } from 'antd';
import { Column } from '@ant-design/plots';
import * as columnChartConfig from 'utils/config/charts/column';
const { Title } = Typography;
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
    const basicColumnChartConfig = { ...chartData, ...columnChartConfig.basicColumn };
    return (
        <Card bordered={false} style={{ height: '100%' }}>
            <div className="card_header">
                <Title level={4}>Purchases</Title>
                <Segmented options={['Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
            </div>
            <div className="card_content">
                <Column {...basicColumnChartConfig} />
            </div>
        </Card>
    );
};

export default SupplierPurchaseChart;
