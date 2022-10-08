import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Tooltip, Radio, Timeline, Button } from 'antd';
import { CodeSandboxOutlined, TagOutlined, UnorderedListOutlined, RetweetOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/plots';
import { useParams } from 'react-router-dom';
import { Line } from '@ant-design/plots';
import useTopbar from 'utils/hooks/useTopbar';
import useDataList from 'utils/hooks/useDataList';
import useStatisticCard from 'utils/hooks/useStatisticCard';

import * as service from '@services';
import * as supplierProps from '../Supplier/props';

import * as columnChartConfig from 'utils/config/charts/column';
const { Title, Text } = Typography;

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

const statisticCardData = [
    {
        icon: <TagOutlined />,
        title: '5',
        text: "Today's Orders",
        percentage: '-2',
    },
    {
        icon: <CodeSandboxOutlined />,
        title: '10',
        text: 'New Products',
        percentage: '+3',
    },
    {
        icon: <TagOutlined />,
        title: '6',
        text: 'Total Order',
        percentage: '+9',
    },
    {
        icon: <CodeSandboxOutlined />,
        title: '9',
        text: 'Total Product',
        percentage: '+3',
    },
];

const timelineList = [
    {
        title: '$2,400 - Redesign store',
        time: '09 JUN 7:20 PM',
        color: 'green',
    },
    {
        title: 'New order #3654323',
        time: '08 JUN 12:20 PM',
        color: 'green',
    },
    {
        title: 'Company server payments',
        time: '04 JUN 3:10 PM',
    },
    {
        title: 'New card added for order #4826321',
        time: '02 JUN 2:45 PM',
    },
    {
        title: 'Unlock folders for development',
        time: '18 MAY 1:30 PM',
    },
    {
        title: 'New order #46282344',
        time: '14 MAY 3:30 PM',
        color: 'gray',
    },
];

const SupplierDetail = (props) => {
    const basicColumnChartConfig = { ...chartData, ...columnChartConfig.basicColumn };
    const [reverse, setReverse] = useState(false);
    const [listDataSource, setListDataSource] = useState([]);
    const { DataList } = useDataList({
        data: listDataSource,
        layout: 'horizontal',
    });
    const { StatisticCard } = useStatisticCard({ data: statisticCardData });
    const { id } = useParams();
    const dataId = parseInt(id);
    const { Topbar } = useTopbar({
        title: '',
        dataId: dataId,
        table: 'supplier',
    });

    const getContactbySupplierId = async (dataId) => {
        let supplierInfoRes = await service.getById('supplier', dataId);
        let listData = supplierProps.supplierDataList(supplierInfoRes);
        setListDataSource(listData);
    };

    useEffect(() => {
        getContactbySupplierId(dataId);
    }, []);
    return (
        <>
            <Row gutter={[16, 16]}>
                <Topbar />
            </Row>
            <Row gutter={[24, 24]}>
                <StatisticCard />
            </Row>
            <Row gutter={[24, 24]} style={{ marginTop: '24px', marginBottom: '24px' }}>
                <Col span={16}>
                    <Card bordered={false}>
                        <div className="card_header">
                            <Title level={4}>Orders</Title>
                            <Radio.Group
                                defaultValue="week"
                                style={{
                                    marginTop: 16,
                                }}
                            >
                                <Radio.Button value="week">Week</Radio.Button>
                                <Radio.Button value="month">Month</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className="card_content">
                            <Column {...basicColumnChartConfig} />
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <div className="card_header">
                            <Title level={4}>Overview</Title>
                        </div>
                        <div className="card_content">
                            <DataList />
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[24, 0]}>
                <Col span={16}>
                    <Card bordered={false}>
                        <div className="card_header">
                            <Title level={4}>Products</Title>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <div className="card_header">
                            <Title level={4}>Orders History</Title>
                            <Tooltip placement="top" title="Reverse" color="#7A3DB8">
                                <Button type="primary" className="width-100" onClick={() => setReverse(!reverse)}>
                                    {<RetweetOutlined />}
                                </Button>
                            </Tooltip>
                        </div>
                        <div className="card_content">
                            <Timeline className="timelinelist" reverse={reverse}>
                                {timelineList.map((t, index) => (
                                    <Timeline.Item color={t.color} key={index}>
                                        <Title level={5}>{t.title}</Title>
                                        <Text>{t.time}</Text>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                            <Button type="primary" className="width-100">
                                {<UnorderedListOutlined />} See All Orders
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SupplierDetail;
