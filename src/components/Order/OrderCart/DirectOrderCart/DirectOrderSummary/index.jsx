import React, { useState, useEffect, useRef, useContext } from 'react';

import { Row, Col, Card, Typography, Button, Space } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined, CreditCardOutlined, DollarOutlined } from '@ant-design/icons';

import { DirectOrderCartContext } from 'pages/Order/DirectOrder/NewDirectOrder';

import DirectOrderPriceSummary from './DirectOrderPriceSummary';
import DirectOrderProductSummary from './DirectOrderProductSummary';

const { Title } = Typography;
const DirectOrderSummary = (props) => {
    const { directOrderCartData, setDirectOrderCartData } = useContext(DirectOrderCartContext);
    const [selectedOption, setSelectedOption] = useState('Cash');

    const myOnClick = (value) => {
        setSelectedOption(value);
    };

    const checkedCard = {
        width: 100,
        background: '#7a3db8',
        color: 'white',
    };

    const uncheckedCard = {
        width: 100,
    };

    return (
        <>
            <DirectOrderProductSummary />
            <DirectOrderPriceSummary />

            <Card bordered={false} style={{}}>
                <Row style={{ marginBottom: '20px' }}>
                    <Col span={12}>
                        <Title level={5} style={{ marginBottom: '15px', marginTop: '0' }}>
                            Payment Method
                        </Title>
                        <Space size="middle">
                            <Space direction="vertical" size={4}>
                                <Card
                                    hoverable
                                    style={selectedOption == 'Cash' ? checkedCard : uncheckedCard}
                                    bodyStyle={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
                                    onClick={() => myOnClick('Cash')}
                                >
                                    <DollarOutlined style={{ fontSize: '35px' }} />
                                </Card>
                                <Title level={5} style={{ margin: '0', textAlign: 'center' }}>
                                    Cash
                                </Title>
                            </Space>

                            <Space direction="vertical" size={4}>
                                <Card
                                    hoverable
                                    style={selectedOption == 'Card' ? checkedCard : uncheckedCard}
                                    bodyStyle={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
                                    onClick={() => myOnClick('Card')}
                                >
                                    <CreditCardOutlined style={{ fontSize: '35px' }} />
                                </Card>
                                <Title level={5} style={{ margin: '0', textAlign: 'center' }}>
                                    Card
                                </Title>
                            </Space>
                        </Space>
                    </Col>
                </Row>
                <Row justify="end">
                    <Button
                        type="primary"
                        disabled={directOrderCartData.length > 0 ? false : true}
                        size="large"
                        icon={<ShoppingCartOutlined />}
                        onClick={(e) => {
                            //e.stopPropagation();
                        }}
                        style={{ width: '100%' }}
                    >
                        Check out
                    </Button>
                </Row>
            </Card>
        </>
    );
};

export default DirectOrderSummary;
