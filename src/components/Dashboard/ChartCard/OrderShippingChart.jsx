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
            type: 'Processing',
            value: 10,
        },
        {
            type: 'Shipped',
            value: 2,
        },
        {
            type: 'Delivered',
            value: 3,
        },
        {
            type: 'Checking',
            value: 5,
        },
        {
            type: 'Completed',
            value: 3,
        },
        {
            type: 'Returned',
            value: 1,
        },
        {
            type: 'Cancelled',
            value: 0,
        },
    ],
};
const OrderShippingChart = (props) => {
    const orderShippingChartConfig = { ...chartData, ...pieChartConfig.pie, ...heightPieChart };
    return (
        <Card bordered={false} title="Order Shipping Overview">
            <Pie {...orderShippingChartConfig} />
        </Card>
    );
};

export default OrderShippingChart;
