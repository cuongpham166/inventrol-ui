import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Modal, Space, Input, Typography } from 'antd';

import { PurchaseCartContext } from 'pages/Supplier/NewPurchase';

import POReportTemplate from 'utils/template/POReportTemplate';

import { $ } from 'moneysafe';

const { Text: AntText } = Typography;

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

    const [filename, setFilename] = useState('PurchaseOrderReport');
    const [exportData, setExportData] = useState({});

    const createExportDataObject = (cartData) => {
        let cartItemList = [];
        cartData.map((value, index) => {
            let cartItem = {
                code: value.barcode,
                name: value.name + '-' + value.attributeValue[0].name,
                quantity: value.quantity,
                type: value.attributeValue[0].name,
                unitCost: value.listingPrice,
                totalCost: $(value.quantity * value.listingPrice).toFixed(),
                brand: value.brand.name,
            };
            cartItemList.push(cartItem);
        });
        let exportDataObj = { items: cartItemList };
        setExportData(exportDataObj);
    };

    useEffect(() => {
        createExportDataObject(cartData);
    }, []);

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
                    <POReportTemplate filename={filename} exportData={exportData} />
                    <Button onClick={props.onCancel} type="primary" danger>
                        Close
                    </Button>
                </Space>
            }
        >
            <AntText>Filename</AntText>
            <Input placeholder="Filename" value={filename} onChange={handleChangeFilename} />
        </Modal>
    );
};

export default PurchaseSummaryFile;
