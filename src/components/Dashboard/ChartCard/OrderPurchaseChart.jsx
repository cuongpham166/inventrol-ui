import React from 'react';
import { Col, Row, Button, Card, Segmented, Typography, Select, Space, DatePicker } from 'antd';

import { Line, Column } from '@ant-design/plots';
import * as lineChartConfig from 'utils/config/charts/line';
import * as columnChartConfig from 'utils/config/charts/column';
import * as mockupData from '../../../mockup/data';
import dayjs from 'dayjs';
import { useState } from 'react';
const { RangePicker } = DatePicker;
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

const rangePresets = [
    {
        label: 'Last 7 Days',
        value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
        label: 'Last 14 Days',
        value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
        label: 'Last 30 Days',
        value: [dayjs().add(-30, 'd'), dayjs()],
    },
    {
        label: 'Last 90 Days',
        value: [dayjs().add(-90, 'd'), dayjs()],
    },
];

const OrderPurchaseChart = (props) => {
    let data = mockupData.getMockupData();
    //console.log('mockupData', data);
    const defaultValue = 'week';
    const [range, setRange] = useState(defaultValue);

    const transactionChartConfig = { ...chartTransactionData, ...columnChartConfig.groupedColumns, ...heightLineChart };
    const onRangeChange = (value) => {
        console.log(`selected ${value}`);
    };
    const handleChange = (value) => {
        setRange(value);
        console.log(`selected ${value}`);
    };
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
                        <Space.Compact>
                            <Select
                                defaultValue={defaultValue}
                                style={{ width: 100, textAlign: 'center' }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'week',
                                        label: 'Weekly',
                                    },
                                    {
                                        value: 'month',
                                        label: 'Monthly',
                                    },
                                    {
                                        value: 'quarter',
                                        label: 'Quarterly',
                                    },
                                    {
                                        value: 'year',
                                        label: 'Yearly',
                                    },
                                ]}
                            />
                            <RangePicker picker={range} onChange={onRangeChange} style={{ width: 260 }} />
                        </Space.Compact>
                    </Col>
                </Row>
            }
        >
            <Column {...transactionChartConfig} />
        </Card>
    );
};

export default OrderPurchaseChart;
