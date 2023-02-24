import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Modal, Space, Input, Typography } from 'antd';

import { PurchaseCartContext } from 'pages/Supplier/NewPurchase';

const { Text } = Typography;

const PurchaseSummaryFile = (props) => {
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

    const [filename, setFilename] = useState('exportFile');

    const handleChangeFilename = (e) => {
        setFilename(e.target.value);
    };

    return (
        <Modal
            title="Export file"
            open={props.open}
            onOk={props.onOk}
            onCancel={props.onCancel}
            footer={
                <Space>
                    <Button type="primary">Export File</Button>
                    <Button onClick={props.onCancel}>Close</Button>
                </Space>
            }
        >
            <Text>Filename</Text>
            <Input placeholder="Filename" value={filename} onChange={handleChangeFilename} />
        </Modal>
    );
};

export default PurchaseSummaryFile;
