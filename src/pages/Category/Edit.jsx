import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Row, Col } from 'antd';

import useTopbar from 'utils/hooks/useTopbar';
import useCustomForm from 'utils/hooks/useCustomForm';

import * as categoryProps from '../Category/props';
import * as service from '../../api/services/index';
const EditCategory = (props) => {
    const [initialFormValues, setInitialFormValues] = useState({});
    const { id } = useParams();
    const dataId = parseInt(id);
    const { Topbar } = useTopbar({
        title: '',
        dataId: dataId,
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
            <Row gutter={[16, 16]}>
                <Topbar />
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
