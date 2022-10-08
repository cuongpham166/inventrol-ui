import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Tooltip, Tabs, List } from 'antd';
import { CodeSandboxOutlined, TagOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/plots';
import { useParams } from 'react-router-dom';

import { Line } from '@ant-design/plots';

import useTopbar from 'utils/hooks/useTopbar';
import useDataList from 'utils/hooks/useDataList';
import useStatisticCard from 'utils/hooks/useStatisticCard';
import * as lineChartConfig from 'utils/config/charts/line';

import * as service from '@services';
import * as productProps from '../Product/props';
import * as supplierProps from '../Supplier/props';

const { Title, Text } = Typography;

const chartData = {
    data: [
        {
            type: 'Retail Price',
            date: '07.10.2020',
            number: 5.24,
        },
        {
            type: 'Retail Price',
            date: '17.11.2020',
            number: 5.3,
        },
        {
            type: 'Retail Price',
            date: '20.11.2020',
            number: 8.55,
        },
        {
            type: 'Retail Price',
            date: '01.02.2021',
            number: 6.68,
        },
        {
            type: 'Retail Price',
            date: '06.03.2021',
            number: 6.27,
        },
        {
            type: 'Listing Price',
            date: '07.10.2020',
            number: 4.24,
        },
        {
            type: 'Listing Price',
            date: '17.11.2020',
            number: 3.3,
        },
        {
            type: 'Listing Price',
            date: '20.11.2020',
            number: 6.55,
        },
        {
            type: 'Listing Price',
            date: '01.02.2021',
            number: 7.68,
        },
        {
            type: 'Listing Price',
            date: '06.03.2021',
            number: 5.27,
        },
    ],
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

const ProductDetail = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);
    const multiLineChartConfig = { ...chartData, ...lineChartConfig.multiLine };
    const transactionChartConfig = { ...chartTransactionData, ...lineChartConfig.multiLine };
    const { StatisticCard } = useStatisticCard({ data: statisticCardData });

    const [productDataListSource, setProductDataListSource] = useState([]);
    const { DataList: ProductDataList } = useDataList({
        data: productDataListSource,
        layout: 'horizontal',
    });

    const [supplierTabSource, setSupplierTabSource] = useState([]);

    const { Topbar } = useTopbar({
        title: '',
        dataId: dataId,
        table: 'product',
    });

    const getProductDetailInfo = async (dataId) => {
        let productInfoRes = await service.getById('product', dataId);
        let productDataList = productProps.productDataList(productInfoRes);
        setProductDataListSource(productDataList);
        renderSupplierTab(productInfoRes.supplier);
    };

    const renderSupplierTab = (supplierData) => {
        let tabItemList = [];
        supplierData.map((val, index) => {
            let tabItem = { label: val.name, key: index };

            let supplierDataList = supplierProps.supplierDataList(val);
            tabItem.children = (
                <List
                    itemLayout={'horizontal'}
                    dataSource={supplierDataList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta title={item.title} key={index} />
                            <Text>{item.text}</Text>
                        </List.Item>
                    )}
                />
            );

            tabItemList.push(tabItem);
        });

        setSupplierTabSource(tabItemList);
    };
    useEffect(() => {
        getProductDetailInfo(dataId);
    }, []);

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                <Topbar />
            </Row>
            <Row gutter={[24, 24]}>
                <StatisticCard />
            </Row>
            <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                <Col span={17}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Card bordered={false}>
                                <div className="card_header">
                                    <Title level={4}>Price</Title>
                                </div>
                                <div className="card_content">
                                    <Line {...multiLineChartConfig} />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={[24, 24]} style={{ marginTop: '24px', marginBottom: '24px' }}>
                        <Col span={24}>
                            <Card bordered={false}>
                                <div className="card_header">
                                    <Title level={4}>Transaction</Title>
                                </div>
                                <div className="card_content">
                                    <Line {...transactionChartConfig} />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={7}>
                    <Card bordered={false}>
                        <div className="card_header">
                            <Title level={4}>Overview</Title>
                        </div>
                        <div className="card_content">
                            <ProductDataList />
                        </div>
                    </Card>
                    <Card bordered={false} style={{ marginTop: '24px' }}>
                        <div className="card_header">
                            <Title level={4}>Suppliers</Title>
                        </div>
                        <div className="card_content">
                            <Tabs items={supplierTabSource} onChange={onChange} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductDetail;
