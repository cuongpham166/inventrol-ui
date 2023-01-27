import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col, Table } from 'antd';

import PurchaseProductList from 'components/Purchase/PurchaseCart/PurchaseProductList';
import PurchaseSummary from 'components/Purchase/PurchaseCart/PurchaseSummary';
const CreatePurchase = (props) => {
    const [cartData, setCartData] = useState([]);

    const { id } = useParams();
    const dataId = parseInt(id);

    return (
        <div>
            <Row style={{}} justify="center" gutter={[24, 24]}>
                <Col span={11} style={{}}>
                    <PurchaseProductList supplierId={dataId} setCartData={setCartData} data={cartData} />
                </Col>
                <Col span={13}>
                    <PurchaseSummary setCartData={setCartData} data={cartData} />
                </Col>
            </Row>
        </div>
    );
};

export default CreatePurchase;
