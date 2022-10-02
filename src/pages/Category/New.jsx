import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import useTopbar from 'utils/hooks/useTopbar';
import useCustomForm from 'utils/hooks/useCustomForm';

import * as categoryProps from '../Category/props';

const NewCategory = (props) => {
    const [initialFormValues, setInitialFormValues] = useState(categoryProps.initialFormValues);

    const { Topbar } = useTopbar({
        title: 'Create New Category',
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

export default NewCategory;
