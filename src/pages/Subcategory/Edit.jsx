import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col } from 'antd';
import Breadcrumb from 'components/Breadcrumb';

import usePageHeader from 'utils/hooks/usePageHeader';
import useCustomForm from 'utils/hooks/useCustomForm';

import * as service from '../../api/services';
import * as subcategoryProps from '../Subcategory/props';

const EditSubcategory = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const [initialFormValues, setInitialFormValues] = useState({});

    const { PageHeader } = usePageHeader({
        title: 'Update Subcategory',
        dataId: '',
        table: 'subcategory',
    });

    const { CustomForm } = useCustomForm({
        table: 'subcategory',
        initialFormValues: initialFormValues,
        CustomFormMainItems: subcategoryProps.CustomFormMainItems,
        formType: 'edit',
        dataId: dataId,
    });

    const getSubcategoryById = async (dataId) => {
        let result = await service.getById('subcategory', dataId);
        setInitialFormValues({
            name: result.name,
            category: result.category.name,
            tagColor: result.tagColor,
            notice: result.notice,
        });
    };

    useEffect(() => {
        getSubcategoryById(dataId);
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

export default EditSubcategory;
