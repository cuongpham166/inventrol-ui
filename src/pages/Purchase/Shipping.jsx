import React from 'react';
import Breadcrumb from 'components/common/Breadcrumb';
import PurchaseShippingList from 'components/Purchase/PurchaseShipping/PurchaseShippingList';

import { Col, Row } from 'antd';

const PurchaseShipping = (props) => {
    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>

            <>
                <PurchaseShippingList />
            </>
        </>
    );
};

export default PurchaseShipping;
