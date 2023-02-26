import React, { useState, useEffect, useRef, useContext } from 'react';
import { Modal, Typography, Skeleton, Result, Space, Button, Input, Spin } from 'antd';

import { useGetPurchaseQuery } from 'features/api/apiSlice';

import POReportTemplate from 'utils/template/POReportTemplate';

import { $ } from 'moneysafe';

const { Text } = Typography;

const PurchaseOrderReportModal = ({ isPurchaseOrderReportModalOpen, handlePurchaseOrderReportModalOk, dataID }) => {
    let content;
    let footerContent;

    const { data: purchase, isLoading, isSuccess, isError, error } = useGetPurchaseQuery(dataID);

    const [filename, setFilename] = useState('PurchaseOrderReport');
    const [exportData, setExportData] = useState({});

    const handleChangeFilename = (e) => {
        setFilename(e.target.value);
    };

    if (isLoading) {
        content = <Spin />;
        footerContent = <Spin />;
    } else if (isSuccess) {
        content = (
            <>
                <Text>Filename</Text>
                <Input placeholder="Filename" value={filename} onChange={handleChangeFilename} />
            </>
        );

        footerContent = (
            <Space>
                <POReportTemplate filename={filename} exportData={exportData} />
                <Button onClick={handlePurchaseOrderReportModalOk} type="primary" danger>
                    Close
                </Button>
            </Space>
        );
    } else if (isError) {
        let errorStatus = `[${error.status}] - ${error.error}`;
        content = <Result status="warning" title={errorStatus} />;
        footerContent = <></>;
    }

    useEffect(() => {
        if (purchase != undefined) {
            let cartItemList = [];
            purchase.purchaseItem.map((value, index) => {
                let cartItem = {
                    code: value.product.barcode,
                    name: value.product.name + '-' + value.product.attributeValue[0].name,
                    quantity: value.quantity,
                    type: value.product.attributeValue[0].name,
                    unitCost: value.product.listingPrice,
                    totalCost: $(value.quantity * value.product.listingPrice).toFixed(),
                    brand: value.product.brand.name,
                };
                cartItemList.push(cartItem);
            });
            console.log('purchase', purchase);
            let purchaseInfo = { id: purchase.id, date: purchase.createdOn };
            let purchaseSummary = { notice: purchase.notice, payment: purchase.paymentType, total: purchase.total };
            let exportDataObj = {
                items: cartItemList,
                supplier: purchase.supplier,
                purchaseInfo: purchaseInfo,
                purchaseSummary: purchaseSummary,
            };

            setExportData(exportDataObj);
        }
    }, [purchase]);

    return (
        <>
            <Modal
                title="Export Purchase Order Report"
                open={isPurchaseOrderReportModalOpen}
                onOk={handlePurchaseOrderReportModalOk}
                closable={false}
                footer={footerContent}
            >
                {content}
            </Modal>
        </>
    );
};

export default PurchaseOrderReportModal;
