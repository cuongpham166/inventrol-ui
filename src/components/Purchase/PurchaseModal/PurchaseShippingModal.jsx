import React from 'react';
import { Modal, List, Typography, Skeleton, Result } from 'antd';

import { useGetPurchaseQuery } from 'features/api/apiSlice';

const { Text } = Typography;
const PurchaseShippingModal = ({ isViewShippingModalOpen, handleViewShippingModalOk, dataID }) => {
    let content;
    const { data: purchase, isLoading, isSuccess, isError, error } = useGetPurchaseQuery(dataID);

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <List>
                <List.Item>
                    <List.Item.Meta title="Service" key={'Service'} />
                    <Text>{purchase.purchaseshipping.service}</Text>
                </List.Item>
                <List.Item>
                    <List.Item.Meta title="Tracking Number" key={'Tracking Number'} />
                    <Text>{purchase.purchaseshipping.trackingNumber}</Text>
                </List.Item>
            </List>
        );
    } else if (isError) {
        let errorStatus = `[${error.status}] - ${error.error}`;
        content = <Result status="warning" title={errorStatus} />;
    }

    return (
        <>
            <Modal
                title="Shipping Information"
                open={isViewShippingModalOpen}
                onOk={handleViewShippingModalOk}
                okText={'Close'}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={false}
            >
                {content}
            </Modal>
        </>
    );
};

export default PurchaseShippingModal;
