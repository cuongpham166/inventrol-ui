import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import Breadcrumb from 'components/Breadcrumb';

import useCustomForm from 'utils/hooks/useCustomForm';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as attributeProps from '../Attribute/props';

const CreateAttribute = (props) => {
    const [initialFormValues, setInitialFormValues] = useState(attributeProps.initialFormValues);

    const { PageHeader } = usePageHeader({
        title: 'New Attribute',
        dataId: '',
        table: 'attribute',
    });

    const { CustomForm } = useCustomForm({
        table: 'attribute',
        initialFormValues: initialFormValues,
        CustomFormMainItems: attributeProps.CustomFormMainItems,
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

export default CreateAttribute;
