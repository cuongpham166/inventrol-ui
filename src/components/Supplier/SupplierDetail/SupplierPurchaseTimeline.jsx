import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Tooltip, Radio, Timeline, Button, Tag, Space } from 'antd';
import { UnorderedListOutlined, RetweetOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import * as service from '@services';
import PurchaseShippingStatusCard from 'components/Purchase/PurchaseShipping/PurchaseShippingStatusCard';
import * as dayjs from 'dayjs';

const { Title, Text } = Typography;

const SupplierPurchaseTimeline = (props) => {
    const supplierId = props.supplierId;
    const [reverse, setReverse] = useState(false);
    const [datasource, setDatasource] = useState([]);

    const getPurchaseList = async (supplierId) => {
        if (supplierId) {
            let result = await service.getAll(`supplier/${supplierId}/purchases`);
            result.sort((a, b) => {
                return b.id - a.id;
            });
            if (result.length > 5) {
                result = result.slice(0, 5);
            }
            setDatasource(result);
        }
    };

    useEffect(() => {
        getPurchaseList(supplierId);
    }, []);

    return (
        <Card bordered={false}>
            <div className="card_header">
                <Title level={4}>Purchase History</Title>
                <Tooltip placement="top" title="Reverse" color="#7A3DB8">
                    <Button type="primary" className="width-100" onClick={() => setReverse(!reverse)}>
                        {<RetweetOutlined />}
                    </Button>
                </Tooltip>
            </div>
            <div className="card_content">
                <Timeline className="timelinelist" reverse={reverse}>
                    {datasource.map((data, index) => (
                        <Timeline.Item key={index}>
                            <Space direction="vertical">
                                <Space>
                                    <Text strong>New Purchase #{data.id}</Text>
                                    <PurchaseShippingStatusCard status={data.purchaseshipping.status} />
                                </Space>

                                <Text type="secondary">{dayjs(data.createdOn).format('LLL')}</Text>
                            </Space>
                        </Timeline.Item>
                    ))}
                </Timeline>
                <Link to={'/supplier/' + supplierId + '/purchase'}>
                    <Button type="primary" className="width-100" style={{ marginTop: '20px' }}>
                        {<UnorderedListOutlined />} See All Purchases
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default SupplierPurchaseTimeline;
