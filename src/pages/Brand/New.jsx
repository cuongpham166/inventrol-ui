import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';

import useCustomForm from 'utils/hooks/useCustomForm';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as brandProps from '../Brand/props';

const CreateBrand = (props) => {
    const [initialFormValues, setInitialFormValues] = useState(brandProps.initialFormValues);

    const { PageHeader } = usePageHeader({
        title: 'New Brand',
        dataId: '',
        table: 'brand',
    });

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

export default CreateBrand;
