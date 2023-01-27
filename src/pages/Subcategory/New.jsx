import React, { useState } from 'react';

import { Row, Col } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';

import useCustomForm from 'utils/hooks/useCustomForm';

import * as subcategoryProps from '../Subcategory/props';

const NewSubcategory = (props) => {
    const [initialFormValues, setInitialFormValues] = useState(subcategoryProps.initialFormValues);

    const { CustomForm } = useCustomForm({
        table: 'subcategory',
        initialFormValues: initialFormValues,
        CustomFormMainItems: subcategoryProps.CustomFormMainItems,
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

export default NewSubcategory;
