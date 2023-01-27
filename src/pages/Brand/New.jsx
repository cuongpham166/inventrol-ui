import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';

import useCustomForm from 'utils/hooks/useCustomForm';

import * as brandProps from '../Brand/props';

const CreateBrand = (props) => {
    const [initialFormValues, setInitialFormValues] = useState(brandProps.initialFormValues);

    const { CustomForm } = useCustomForm({
        table: 'brand',
        initialFormValues: initialFormValues,
        CustomFormMainItems: brandProps.CustomFormMainItems,
        formType: 'new',
        dataId: '',
    });
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

export default CreateBrand;
