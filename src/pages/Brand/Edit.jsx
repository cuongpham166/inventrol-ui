import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Row, Col } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';

import useCustomForm from 'utils/hooks/useCustomForm';

import * as brandProps from '../Brand/props';
import * as service from '../../api/services/index';

const EditBrand = (props) => {
    const [initialFormValues, setInitialFormValues] = useState({});
    const { id } = useParams();
    const dataId = parseInt(id);

    const { CustomForm } = useCustomForm({
        table: 'brand',
        initialFormValues: initialFormValues,
        CustomFormMainItems: brandProps.CustomFormMainItems,
        formType: 'edit',
        dataId: dataId,
    });

    const getBrandById = async (dataId) => {
        const result = await service.getById('brand', dataId);

        setInitialFormValues({
            name: result.name,
            notice: result.notice,
        });
    };

    useEffect(() => {
        getBrandById(dataId);
    }, []);

    return (
        <div>
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

export default EditBrand;
