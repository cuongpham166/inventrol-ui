import React, { useState, useEffect, useRef, createContext } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col, Table } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';
import PurchaseProductList from 'components/Purchase/PurchaseCart/PurchaseProductList';
import PurchaseSummary from 'components/Purchase/PurchaseCart/PurchaseSummary';
import PurchaseSummaryResult from 'components/Purchase/PurchaseCart/PurchaseSummaryResult';

export const PurchaseCartContext = createContext();

const CreatePurchase = (props) => {
    const [cartData, setCartData] = useState([]);
    const [successfulPurchase, setSuccessfulPurchase] = useState(false);

    const [paymentType, setPaymentType] = useState('Cash');
    const [purchaseNotice, setPurchaseNotice] = useState('');

    const { id } = useParams();
    const dataId = parseInt(id);

    return (
        <>
            <PurchaseCartContext.Provider
                value={{
                    cartData: cartData,
                    successfulPurchase: successfulPurchase,
                    paymentType: paymentType,
                    purchaseNotice: purchaseNotice,
                    setCartData: setCartData,
                    setSuccessfulPurchase: setSuccessfulPurchase,
                    setPaymentType: setPaymentType,
                    setPurchaseNotice: setPurchaseNotice,
                }}
            >
                {!successfulPurchase ? (
                    <>
                        <Row>
                            <Breadcrumb />
                        </Row>

                        <Row style={{}} justify="center" gutter={[24, 24]}>
                            <>
                                <Col span={11} style={{}}>
                                    <PurchaseProductList supplierId={dataId} />
                                </Col>
                                <Col span={13}>
                                    <PurchaseSummary />
                                </Col>
                            </>
                        </Row>
                    </>
                ) : (
                    <PurchaseSummaryResult />
                )}
            </PurchaseCartContext.Provider>
        </>
    );
};

export default CreatePurchase;
