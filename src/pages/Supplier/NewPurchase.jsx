import React, { useState, useEffect, useRef, createContext } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col, Table } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';
import PurchaseProductList from 'components/Purchase/PurchaseCart/PurchaseProductList';
import PurchaseSummary from 'components/Purchase/PurchaseCart/PurchaseSummary';

export const PurchaseCartContext = createContext();

const CreatePurchase = (props) => {
    const [cartData, setCartData] = useState([]);

    const { id } = useParams();
    const dataId = parseInt(id);

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>

            <Row style={{}} justify="center" gutter={[24, 24]}>
                <PurchaseCartContext.Provider value={{ cartData: cartData, setCartData: setCartData }}>
                    <Col span={11} style={{}}>
                        <PurchaseProductList supplierId={dataId} />
                    </Col>
                    <Col span={13}>
                        <PurchaseSummary />
                    </Col>
                </PurchaseCartContext.Provider>
            </Row>
        </>
    );
};

export default CreatePurchase;
