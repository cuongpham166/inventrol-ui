import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';

import useCustomForm from 'utils/hooks/useCustomForm';

import * as service from '../../api/services';
import * as supplierProps from '../Supplier/props';

const EditSupplier = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const [initialFormValues, setInitialFormValues] = useState({});

    const { CustomForm } = useCustomForm({
        table: 'supplier',
        initialFormValues: initialFormValues,
        CustomFormMainItems: supplierProps.CustomFormMainItems,
        formType: 'edit',
        dataId: dataId,
    });

    const getSupplierById = async (dataId) => {
        let result = await service.getById('supplier', dataId);
        setInitialFormValues({
            name: result.name,
            contactPerson: result.contactPerson,
            notice: result.notice,
            website: result.contact.website,
            phoneNumber: result.contact.phoneNumber,
            mobileNumber: result.contact.mobileNumber,
            streetName: result.contact.streetName,
            streetNumber: result.contact.streetNumber,
            additionalAddressLine: result.contact.additionalAddressLine,
            postcode: result.contact.postcode,
            city: result.contact.city,
            country: result.contact.country,
        });
    };

    useEffect(() => {
        getSupplierById(dataId);
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

export default EditSupplier;
