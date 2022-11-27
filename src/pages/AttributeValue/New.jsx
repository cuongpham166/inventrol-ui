import React, { useState } from 'react';

import { Row, Col } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';

import usePageHeader from 'utils/hooks/usePageHeader';
import useCustomForm from 'utils/hooks/useCustomForm';

import * as attributeValueProps from '../AttributeValue/props';

const CreateAttributeValue = (props) => {
    const [initialFormValues, setInitialFormValues] = useState(attributeValueProps.initialFormValues);

    const { PageHeader } = usePageHeader({
        title: 'New Attribute Value',
        dataId: '',
        table: 'attribute-value',
    });

    const { CustomForm } = useCustomForm({
        table: 'attribute-value',
        initialFormValues: initialFormValues,
        CustomFormMainItems: attributeValueProps.CustomFormMainItems,
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

export default CreateAttributeValue;
