import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Button } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import * as services from '../../../api/services';
import PurchaseShippingCard from './PurchaseShippingCard';
import PurchaseShippingModal from './PurchaseShippingModal';
import PurchaseShippingStatusCard from './PurchaseShippingStatusCard';
const PurchaseShippingList = (props) => {
    const [datasoure, setDatasource] = useState([]);
    const [shippingStatus, setShipingStatus] = useState([
        'Processing',
        'Shipped',
        'Delivered',
        'Checking',
        'Completed',
    ]);
    const getAllShippingData = async () => {
        const result = await services.getAll('purchase/shipping');
        setDatasource(result);
    };

    useEffect(() => {
        getAllShippingData();
    }, []);

    return (
        <Row gutter={[24, 24]}>
            {shippingStatus.map((status, index) => {
                return (
                    <Col span={4} key={index}>
                        <Card
                            title={<PurchaseShippingStatusCard status={status} />}
                            bordered={false}
                            style={{ height: '100%' }}
                            extra={<PurchaseShippingModal data={datasoure} status={status} />}
                        >
                            <PurchaseShippingCard data={datasoure} status={status} />
                        </Card>
                    </Col>
                );
            })}

            <Col span={4}>
                <Card
                    title={<PurchaseShippingStatusCard status={'Returned'} />}
                    bordered={false}
                    style={{ height: 'calc(50% - 12px)' }}
                    extra={<PurchaseShippingModal data={datasoure} status={'Returned'} />}
                >
                    <PurchaseShippingCard data={datasoure} status={'Returned'} />
                </Card>
                <Card
                    title={<PurchaseShippingStatusCard status={'Cancelled'} />}
                    bordered={false}
                    style={{ marginTop: '24px', height: 'calc(50% - 12px)' }}
                    extra={<PurchaseShippingModal data={datasoure} status={'Cancelled'} />}
                >
                    <PurchaseShippingCard data={datasoure} status={'Cancelled'} />
                </Card>
            </Col>
        </Row>
    );
};

export default PurchaseShippingList;
