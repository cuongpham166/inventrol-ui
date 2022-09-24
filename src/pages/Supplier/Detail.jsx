import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Tooltip, Radio } from 'antd';
import { CodeSandboxOutlined, TagOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/plots';
import { useParams } from 'react-router-dom';

import useTopbar from 'utils/hooks/useTopbar';
import useDataList from 'utils/hooks/useDataList';
import useStatisticCard from 'utils/hooks/useStatisticCard';

import * as service from '@services';

const { Title, Paragraph, Text } = Typography;

const data = [
    {
        type: '家具家电',
        sales: 38,
    },
    {
        type: '粮油副食',
        sales: 52,
    },
    {
        type: '生鲜水果',
        sales: 61,
    },
    {
        type: '美容洗护',
        sales: 145,
    },
    {
        type: '母婴用品',
        sales: 48,
    },
    {
        type: '进口食品',
        sales: 38,
    },
    {
        type: '食品饮料',
        sales: 38,
    },
];
const config = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
        // 可手动配置 label 数据标签位置
        position: 'middle',
        // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
            width: '100%',
            fill: '#FFFFFF',
            opacity: 0.6,
        },
    },
    xAxis: {
        label: {
            autoHide: true,
            autoRotate: false,
        },
    },
    meta: {
        type: {
            alias: '类别',
        },
        sales: {
            alias: 'sales',
        },
    },
};

const statisticCardData = [
    {
        icon: <TagOutlined />,
        title: '5',
        text: "Today's Orders",
        percentage: '-2',
    },
    {
        icon: <TagOutlined />,
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
        icon: <TagOutlined />,
        title: '9',
        text: 'Total Product',
        percentage: '+3',
    },
];
const SupplierDetail = (props) => {
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
        let contactId = supplierInfoRes.contact_id;
        let supplierContactRes = await service.getById('contact', contactId);

        let address_1 = supplierContactRes.street_name + ' ' + supplierContactRes.street_number;
        let address_2 = supplierContactRes.additional_address_line;
        let city = supplierContactRes.postcode + ' ' + supplierContactRes.city;
        let country = supplierContactRes.country;
        let listData = [
            {
                title: 'Name',
                text: supplierInfoRes.name,
            },
            {
                title: 'Contact Person',
                text: supplierInfoRes.contact_person,
            },
            {
                title: 'Phone Number',
                text: supplierContactRes.phone_number,
            },

            {
                title: 'Mobile Number',
                text: supplierContactRes.mobile_number,
            },
            {
                title: 'Email',
                text: <a href={supplierContactRes.email}>Send Email</a>,
            },
            {
                title: 'Website',
                text: <a href={supplierContactRes.website}>Homepage</a>,
            },

            {
                title: 'Address',
                text: address_1 + ', ' + address_2 + ', ' + city + ', ' + country,
            },
            {
                title: 'Notice',
                text: (
                    <Tooltip placement="left" title={supplierInfoRes.notice}>
                        <span>Show Notice</span>
                    </Tooltip>
                ),
            },
        ];
        setListDataSource(listData);
    };

    useEffect(() => {
        getContactbySupplierId(dataId);
    }, []);
    return (
        <>
            <Topbar />
            <Row gutter={[24, 24]}>
                <StatisticCard />
            </Row>
            <Row gutter={[24, 24]} style={{ marginTop: '24px', marginBottom: '24px' }}>
                <Col span={14}>
                    <Card bordered={false}>
                        <div className="card_header">
                            <Title level={5}>Orders</Title>
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
                        <div>
                            <Column {...config} />
                        </div>
                    </Card>
                </Col>
                <Col span={10}>
                    <Card bordered={false}>
                        <div className="card_header">
                            <Title level={5}>Overview</Title>
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
                            <Title level={5}>Products</Title>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <div>
                            <Title level={5}>Orders History</Title>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SupplierDetail;
