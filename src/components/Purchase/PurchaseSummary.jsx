import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Table, Divider, Typography } from 'antd';
const { Text, Title } = Typography;
const productSummaryTableColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
];

const PurchaseSummary = ({ data }) => {
    const [total, setTotal] = useState(0.0);
    const totalRef = useRef(total);
    console.log(data);

    let productSet = new Set(data);
    let productList = [...productSet];

    useEffect(() => {
        let totalVal = 0.0;
        data.map((value, index) => {
            totalVal += value.listingPrice;
            totalRef.current = totalVal;
            setTotal(totalVal);
        });
    }, [data]);

    return (
        <>
            <Card title="Purchase Summary" bordered={false} style={{}}>
                <Table columns={productSummaryTableColumns} dataSource={productList} rowKey="id" />
                <Divider />
                <Row justify="space-between" align="middle">
                    <Title level={4} style={{ marginTop: '0' }}>
                        Total Cost
                    </Title>
                    <Title level={4} style={{ marginTop: '0' }}>
                        {totalRef.current}€
                    </Title>
                </Row>
            </Card>
        </>
    );
};

export default PurchaseSummary;
