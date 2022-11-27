import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col, Table } from 'antd';
import usePageHeader from 'utils/hooks/usePageHeader';

import OrderProductList from 'components/Order/OrderCart/OrderProductList';
import OrderSummary from 'components/Order/OrderCart/OrderSummary';

const NewOrder = (props) => {
    const [cartData, setCartData] = useState([]);
    const { PageHeader } = usePageHeader({
        title: 'New Order',
        dataId: '',
    });
    return (
        <div>
            <Row>
                <PageHeader />
            </Row>
            <Row style={{}} justify="center" gutter={[24, 24]}>
                <Col span={13} style={{}}>
                    <OrderProductList setCartData={setCartData} data={cartData} />
                </Col>
                <Col span={11}>
                    <OrderSummary setCartData={setCartData} data={cartData} />
                </Col>
            </Row>
        </div>
    );
};

export default NewOrder;
