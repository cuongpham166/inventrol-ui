import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Row, Col } from 'antd';

import Breadcrumb from 'components/Breadcrumb';

import useCustomForm from 'utils/hooks/useCustomForm';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as categoryProps from '../Category/props';
import * as service from '../../api/services/index';

const EditCategory = (props) => {
    const [initialFormValues, setInitialFormValues] = useState({});
    const { id } = useParams();
    const dataId = parseInt(id);

    const { PageHeader } = usePageHeader({
        title: 'Update Category',
        dataId: '',
        table: 'category',
    });

    const { CustomForm } = useCustomForm({
        table: 'category',
        initialFormValues: initialFormValues,
        CustomFormMainItems: categoryProps.CustomFormMainItems,
        formType: 'edit',
        dataId: dataId,
    });

    const getCategoryById = async (dataId) => {
        const result = await service.getById('category', dataId);
        setInitialFormValues(result);
    };

    useEffect(() => {
        getCategoryById(dataId);
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

export default EditCategory;
