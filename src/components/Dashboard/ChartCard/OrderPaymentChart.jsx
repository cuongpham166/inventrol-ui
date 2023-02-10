import React from 'react';
import { Col, Row, Button, Card } from 'antd';
import { Pie } from '@ant-design/plots';
import * as pieChartConfig from 'utils/config/charts/pie';
const heightPieChart = {
    height: 450,
};
const chartData = {
    data: [
        {
            type: 'Open',
            value: 10,
        },
        {
            type: 'Partially Paid',
            value: 2,
        },
        {
            type: 'Paid',
            value: 3,
        },
        {
            type: 'Failed',
            value: 5,
        },
    ],
};

const OrderPaymentChart = (props) => {
    const orderPaymentChartConfig = { ...chartData, ...pieChartConfig.pie, ...heightPieChart };
    return (
        <Card bordered={false} title="Order Payment Overview">
            <Pie {...orderPaymentChartConfig} />
        </Card>
    );
};

export default OrderPaymentChart;
