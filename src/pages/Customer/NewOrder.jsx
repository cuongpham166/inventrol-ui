import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col, Table } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';
import OrderProductList from 'components/Order/OrderCart/OrderProductList';
import OrderSummary from 'components/Order/OrderCart/OrderSummary';

const NewOrder = (props) => {
    const [cartData, setCartData] = useState([]);

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            <Row style={{}} justify="center" gutter={[24, 24]}>
                <Col span={13} style={{}}>
                    <OrderProductList setCartData={setCartData} data={cartData} />
                </Col>
                <Col span={11}>
                    <OrderSummary setCartData={setCartData} data={cartData} />
                </Col>
            </Row>
        </>
    );
};

export default NewOrder;
