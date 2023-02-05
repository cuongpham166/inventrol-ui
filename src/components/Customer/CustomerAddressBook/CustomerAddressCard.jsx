import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Col, Row, Tag, Space, Typography, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';
const { Text } = Typography;
const CustomerAddressCard = ({ data }) => {
    const { id } = useParams();
    const customerId = parseInt(id);
    let cardTitel;
    if (data.primary == true) {
        cardTitel = <Tag color="#7A3DB8">Primary Address</Tag>;
    } else {
        cardTitel = <Tag color="default">Address</Tag>;
    }

    let addtionalLine;
    if (data.additionalAddressLine != '') {
        addtionalLine = <Text>{data.additionalAddressLine}</Text>;
    } else {
        addtionalLine = <></>;
    }

    let cardButtons;
    if (data.primary == true) {
        cardButtons = [
            <Tooltip placement="top" title="Edit this  address">
                <Link to={'/customer/' + customerId + '/address/' + data.id}>
                    <EditOutlined />
                </Link>
            </Tooltip>,
            <Tooltip placement="top" title="Delete this address">
                <Link to={'/customer/' + customerId + '/address/' + data.id}>
                    <DeleteOutlined />
                </Link>
            </Tooltip>,
        ];
    } else {
        cardButtons = [
            <Tooltip placement="top" title="Edit this  address">
                <Link to={'/customer/' + customerId + '/address/' + data.id}>
                    <EditOutlined />
                </Link>
            </Tooltip>,
            <Tooltip placement="top" title="Delete this address">
                <Link to={'/customer/' + customerId + '/address/' + data.id}>
                    <DeleteOutlined />
                </Link>
            </Tooltip>,
            <Tooltip placement="top" title="Set as primary address">
                <Link to={'/customer/' + customerId + '/address/' + data.id + '/primary'}>
                    <StarOutlined />
                </Link>
            </Tooltip>,
        ];
    }
    return (
        <Col span={6}>
            <Card title={cardTitel} bordered={false} actions={cardButtons}>
                <Row>
                    <Space direction="vertical">
                        <Text>
                            {data.streetName} {data.streetNumber}
                        </Text>
                        {addtionalLine}
                        <Text>
                            {data.postcode} {data.city}
                        </Text>
                        <Text>{data.country}</Text>
                    </Space>
                </Row>
            </Card>
        </Col>
    );
};

export default CustomerAddressCard;
