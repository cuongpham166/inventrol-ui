import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Tooltip, Radio, Timeline, Button, Tag, Popover } from 'antd';
import {
    CodeSandboxOutlined,
    TagOutlined,
    UnorderedListOutlined,
    RetweetOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { Column } from '@ant-design/plots';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Breadcrumb from 'components/Breadcrumb';

import useStatisticCard from 'utils/hooks/useStatisticCard';
import usePageHeader from 'utils/hooks/usePageHeader';
import useDataTable from 'utils/hooks/useDataTable';

import * as service from '@services';
import * as supplierProps from '../Supplier/props';
import * as productProps from '../Product/props';

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
        key: '1',
        text: "Today's Orders",
        percentage: '-2',
    },
    {
        icon: <CodeSandboxOutlined />,
        title: '10',
        key: '2',
        text: 'New Products',
        percentage: '+3',
    },
    {
        icon: <TagOutlined />,
        title: '6',
        key: '3',
        text: 'Total Order',
        percentage: '+9',
    },
    {
        icon: <CodeSandboxOutlined />,
        title: '9',
        key: '4',
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

    const { StatisticCard } = useStatisticCard({ data: statisticCardData });
    const { id } = useParams();
    const dataId = parseInt(id);

    const [pageHeaderMainContent, setPageHeaderMainContent] = useState([]);
    const [pageHeaderExtra, setPageHeaderExtra] = useState([]);
    const { PageHeader } = usePageHeader({
        title: '',
        dataId: dataId,
        table: 'supplier',
        mainContent: pageHeaderMainContent,
        pageHeaderExtra: pageHeaderExtra,
    });

    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: productProps.productTableColumns,
        table: 'product',
        dataUrl: 'supplier/' + dataId + '/products',
    });

    const getSupplierDataById = async (dataId) => {
        let supplierInfoRes = await service.getById('supplier', dataId);
        let supplierPageHeaderObj = supplierProps.supplierPageHeader(supplierInfoRes);
        setPageHeaderMainContent(supplierPageHeaderObj.mainContent);
        setPageHeaderExtra(supplierPageHeaderObj.pageHeaderExtra);
    };

    useEffect(() => {
        getSupplierDataById(dataId);
    }, []);
    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            <Row>
                <PageHeader />
            </Row>
            <Row gutter={[24, 24]}>
                <StatisticCard />
            </Row>
            <Row gutter={[24, 24]} style={{ marginTop: '24px', marginBottom: '24px' }}>
                <Col span={16}>
                    <Card bordered={false} style={{ height: '100%' }}>
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
                            <Title level={4}>Transaction History</Title>
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
            <Row gutter={[24, 0]}>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="card_header">
                            <Title level={4}>Products</Title>
                        </div>
                        <div className="card_content">
                            <DataTable />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SupplierDetail;
