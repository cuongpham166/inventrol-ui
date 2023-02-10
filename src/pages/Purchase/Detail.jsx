import React from 'react';
import { Col, Row, Skeleton, Result } from 'antd';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'components/common/Breadcrumb';

import PurchaseSupplier from 'components/Purchase/PurchaseDetail/PurchaseSupplier';
import PurchaseItemList from 'components/Purchase/PurchaseDetail/PurchaseItemList';
import PurchaseHistory from 'components/Purchase/PurchaseDetail/PurchaseHistory';
import PurchaseShipping from 'components/Purchase/PurchaseDetail/PurchaseShipping';

import { useGetPurchaseQuery } from 'features/api/apiSlice';

const PurchaseDetail = (props) => {
    let content;

    const { id } = useParams();
    const dataId = parseInt(id);
    const { data: purchase, isLoading, isSuccess, isError, error } = useGetPurchaseQuery(dataId);

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <>
                <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                    <Col span={24}>
                        <PurchaseSupplier data={purchase.supplier} />
                    </Col>
                </Row>
                <Row gutter={[24, 24]}>
                    <Col span={19}>
                        <PurchaseItemList data={purchase} />
                    </Col>
                    <Col span={5}>
                        <PurchaseHistory data={purchase.purchasehistory} />
                        <PurchaseShipping data={purchase.purchaseshipping} />
                    </Col>
                </Row>
            </>
        );
    } else if (isError) {
        let errorStatus = `[${error.status}] - ${error.error}`;
        content = <Result status="warning" title={errorStatus} />;
    }

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            {content}
        </>
    );
};

export default PurchaseDetail;
