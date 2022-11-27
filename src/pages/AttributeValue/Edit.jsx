import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';

import usePageHeader from 'utils/hooks/usePageHeader';
import useCustomForm from 'utils/hooks/useCustomForm';

import * as service from '../../api/services';
import * as attributeValueProps from '../AttributeValue/props';

const EditAttributeValue = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const [initialFormValues, setInitialFormValues] = useState({});

    const { PageHeader } = usePageHeader({
        title: 'Update Attribute Value',
        dataId: '',
        table: 'attribute-value',
    });

    const { CustomForm } = useCustomForm({
        table: 'attribute-value',
        initialFormValues: initialFormValues,
        CustomFormMainItems: attributeValueProps.CustomFormMainItems,
        formType: 'edit',
        dataId: dataId,
    });

    const getAttributeValueById = async (dataId) => {
        let result = await service.getById('attribute-value', dataId);
        setInitialFormValues({
            name: result.name,
            attribute: result.attribute.name,
            notice: result.notice,
        });
    };

    useEffect(() => {
        getAttributeValueById(dataId);
    }, []);

    return (
        <div style={{}}>
            <Row>
                <Breadcrumb />
            </Row>
            <Row>
                <PageHeader />
            </Row>
            <Row style={{ padding: '35px' }} justify="center">
                <Col span={15}>
                    <CustomForm />
                </Col>
            </Row>
        </div>
    );
};

export default EditAttributeValue;
