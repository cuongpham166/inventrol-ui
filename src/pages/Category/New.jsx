import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';

import useCustomForm from 'utils/hooks/useCustomForm';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as categoryProps from '../Category/props';

const NewCategory = (props) => {
    const [initialFormValues, setInitialFormValues] = useState(categoryProps.initialFormValues);

    const { PageHeader } = usePageHeader({
        title: 'New Category',
        dataId: '',
        table: 'category',
    });

    const { CustomForm } = useCustomForm({
        table: 'category',
        initialFormValues: initialFormValues,
        CustomFormMainItems: categoryProps.CustomFormMainItems,
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

export default NewCategory;
