import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import Breadcrumb from 'components/Breadcrumb';

import useCustomForm from 'utils/hooks/useCustomForm';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as productProps from '../Product/props';

const CreateProduct = (props) => {
    const [initialFormValues, setInitialFormValues] = useState(productProps.initialFormValues);

    const { PageHeader } = usePageHeader({
        title: 'New Product',
        dataId: '',
        table: 'product',
    });

    const { CustomForm } = useCustomForm({
        table: 'product',
        initialFormValues: initialFormValues,
        CustomFormMainItems: productProps.CustomFormMainItems,
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

export default CreateProduct;
