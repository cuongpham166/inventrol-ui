import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col, Table } from 'antd';
import usePageHeader from 'utils/hooks/usePageHeader';

import PurchaseProductList from 'components/Purchase/PurchaseProductList';
import PurchaseSummary from 'components/Purchase/PurchaseSummary';

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
                <Col span={11} style={{}}>
                    <PurchaseProductList supplierId={dataId} setCartData={setCartData} cartData={cartData} />
                </Col>
                <Col span={13}>
                    <PurchaseSummary data={cartData} />
                </Col>
            </Row>
        </div>
    );
};

export default CreatePurchase;
