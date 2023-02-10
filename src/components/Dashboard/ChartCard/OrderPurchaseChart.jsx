import React from 'react';
import { Col, Row, Button, Card, Segmented, Typography } from 'antd';
import { Line, Column } from '@ant-design/plots';
import * as lineChartConfig from 'utils/config/charts/line';
import * as columnChartConfig from 'utils/config/charts/column';
const { Title } = Typography;
const heightLineChart = {
    height: 290,
};

const chartTransactionData = {
    data: [
        {
            type: 'Sold',
            date: '07.10.2020',
            number: 5,
        },
        {
            type: 'Sold',
            date: '17.11.2020',
            number: 5,
        },
        {
            type: 'Sold',
            date: '20.11.2020',
            number: 8,
        },
        {
            type: 'Sold',
            date: '01.02.2021',
            number: 6,
        },
        {
            type: 'Sold',
            date: '06.03.2021',
            number: 6,
        },
        {
            type: 'Ordered',
            date: '07.10.2020',
            number: 4,
        },
        {
            type: 'Ordered',
            date: '17.11.2020',
            number: 3,
        },
        {
            type: 'Ordered',
            date: '20.11.2020',
            number: 6,
        },
        {
            type: 'Ordered',
            date: '01.02.2021',
            number: 7,
        },
        {
            type: 'Ordered',
            date: '06.03.2021',
            number: 5,
        },
    ],
};
const OrderPurchaseChart = (props) => {
    const transactionChartConfig = { ...chartTransactionData, ...columnChartConfig.groupedColumns, ...heightLineChart };
    return (
        <Card
            bordered={false}
            title={
                <Row>
                    <Col span={5}>
                        <Title level={5} className="dashboard_chart_title">
                            Order and Purchase Statistics
                        </Title>
                    </Col>
                    <Col span={19} style={{ textAlign: 'right' }}>
                        <Segmented options={['Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
                    </Col>
                </Row>
            }
        >
            <Column {...transactionChartConfig} />
        </Card>
    );
};

export default OrderPurchaseChart;
