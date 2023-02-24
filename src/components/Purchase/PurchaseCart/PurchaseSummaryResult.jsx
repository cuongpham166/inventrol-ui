import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Result } from 'antd';

import { PurchaseCartContext } from 'pages/Supplier/NewPurchase';

import PurchaseSummaryFile from './PurchaseSummaryFile';

const PurchaseSummaryResult = (props) => {
    const {
        cartData,
        successfulPurchase,
        paymentType,
        purchaseNotice,
        setCartData,
        setSuccessfulPurchase,
        setPaymentType,
        setPurchaseNotice,
    } = useContext(PurchaseCartContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        console.log('dfdfd');
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Result
                status="success"
                title="Successfully Purchased Cloud Server ECS!"
                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                    <Button type="primary" key="console" onClick={showModal}>
                        Export Purchase Summary
                    </Button>,
                    <Button
                        type="primary"
                        key="buy"
                        onClick={(e) => {
                            //e.stopPropagation();
                            setSuccessfulPurchase(false);
                            setCartData([]);
                        }}
                    >
                        Make Another Purchase
                    </Button>,
                ]}
            />

            <PurchaseSummaryFile open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
        </>
    );
};

export default PurchaseSummaryResult;
