import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col, Table } from 'antd';
import usePageHeader from 'utils/hooks/usePageHeader';

import PurchasePayment from 'components/Purchase/PurchasePayment';
import PurchaseSummary from 'components/Purchase/PurchaseSummary';
import PurchaseProductList from 'components/Purchase/PurchaseProductList';

const CreatePurchase = (props) => {
    const [cartData, setCartData] = useState([]);
    const { id } = useParams();
    const dataId = parseInt(id);

    const { PageHeader } = usePageHeader({
        title: 'New Purchase',
        dataId: '',
    });

    return (
        <div>
            <Row>
                <PageHeader />
            </Row>
            <Row style={{}} justify="center" gutter={[24, 24]}>
                <Col span={13} style={{}}>
                    <PurchaseProductList supplierId={dataId} setCartData={setCartData} cartData={cartData} />
                    <PurchasePayment />
                </Col>
                <Col span={11}>
                    <PurchaseSummary data={cartData} />
                </Col>
            </Row>
        </div>
    );
};

export default CreatePurchase;
