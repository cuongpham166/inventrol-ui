import React, { useState, useEffect } from 'react';

import { Row, Col } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';
import useCustomForm from 'utils/hooks/useCustomForm';

import * as supplierProps from '../Supplier/props';

const NewSupplier = (props) => {
    const [initialFormValues, setInitialFormValues] = useState(supplierProps.initialFormValues);

    const { CustomForm } = useCustomForm({
        table: 'supplier',
        initialFormValues: initialFormValues,
        CustomFormMainItems: supplierProps.CustomFormMainItems,
        formType: 'new',
        dataId: '',
    });

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

export default NewSupplier;
