import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import * as service from '@services';

import Breadcrumb from 'components/common/Breadcrumb';

import PurchaseDetailComponent from 'components/Purchase/PurchaseDetail';
const PurchaseDetail = (props) => {
    const [datasource, setDataSource] = useState({});
    const { id } = useParams();
    const dataId = parseInt(id);

    const getPurchaseDataById = async (dataId) => {
        let purchaseDataRes = await service.getById('purchase', dataId);
        setDataSource(purchaseDataRes);
    };

    useEffect(() => {
        getPurchaseDataById(dataId);
    }, []);

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>
            <PurchaseDetailComponent datasource={datasource} />
        </>
    );
};

export default PurchaseDetail;
