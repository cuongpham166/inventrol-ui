import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';

import useCustomForm from 'utils/hooks/useCustomForm';

import * as service from '../../api/services';
import * as purchaseProps from '../Purchase/props';

const EditPurchase = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const [initialFormValues, setInitialFormValues] = useState({});

    const { CustomForm } = useCustomForm({
        table: 'purchase',
        initialFormValues: initialFormValues,
        CustomFormMainItems: purchaseProps.CustomEditFormMainItems,
        formType: 'edit',
        dataId: dataId,
    });

    const getPurchaseById = async (dataId) => {
        let result = await service.getById('purchase', dataId);
        setInitialFormValues({
            courier: result.courier,
            trackingNumber: result.trackingNumber,
            notice: result.notice,
        });
    };

    useEffect(() => {
        getPurchaseById(dataId);
    }, []);

    return (
        <div style={{}}>
            <Row>
                <Breadcrumb />
            </Row>
            <Row style={{ padding: '35px' }} justify="center">
                <Col span={15}>
                    <CustomForm />
                </Col>
            </Row>
        </div>
    );
};

export default EditPurchase;
