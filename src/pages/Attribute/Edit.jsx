import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Row, Col } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';

import useCustomForm from 'utils/hooks/useCustomForm';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as attributeProps from '../Attribute/props';
import * as service from '../../api/services/index';

const EditAttribute = (props) => {
    const [initialFormValues, setInitialFormValues] = useState({});
    const { id } = useParams();
    const dataId = parseInt(id);

    const { PageHeader } = usePageHeader({
        title: 'Update Attribute',
        dataId: '',
        table: 'attribute',
    });

    const { CustomForm } = useCustomForm({
        table: 'attribute',
        initialFormValues: initialFormValues,
        CustomFormMainItems: attributeProps.CustomFormMainItems,
        formType: 'edit',
        dataId: dataId,
    });

    const getAttributeById = async (dataId) => {
        const result = await service.getById('attribute', dataId);

        setInitialFormValues({
            name: result.name,
            tagColor: result.tagColor,
            notice: result.notice,
        });
    };

    useEffect(() => {
        getAttributeById(dataId);
    }, []);

    return (
        <div>
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

export default EditAttribute;
