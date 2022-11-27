import React from 'react';
import Breadcrumb from 'components/common/Breadcrumb';
import PurchaseShippingList from 'components/Purchase/PurchaseShipping/PurchaseShippingList';
import usePageHeader from 'utils/hooks/usePageHeader';

import { Col, Row } from 'antd';

const PurchaseShipping = (props) => {
    const { PageHeader } = usePageHeader({
        title: 'List of Purchases Shipping',
        dataId: '',
        table: 'purchase',
        pageHeaderExtra: <></>,
    });

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            <Row>
                <PageHeader />
            </Row>
            <>
                <PurchaseShippingList />
            </>
        </>
    );
};

export default PurchaseShipping;
