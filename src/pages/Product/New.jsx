import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Space } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';

import BarcodeScanner from 'components/common/BarcodeScanner';

import useCustomForm from 'utils/hooks/useCustomForm';

import * as productProps from '../Product/props';
const { Title } = Typography;

const CreateProduct = (props) => {
    const [initialFormValues, setInitialFormValues] = useState(productProps.initialFormValues);

    const { CustomForm, form } = useCustomForm({
        table: 'product',
        initialFormValues: initialFormValues,
        CustomFormMainItems: productProps.CustomFormMainItems,
        formType: 'new',
        dataId: '',
    });

    const onChangeBarcode = (value) => {
        form.setFieldsValue({ barcode: value });
    };

    return (
        <div style={{}}>
            <Row>
                <Breadcrumb />
            </Row>
            <Row style={{ padding: '35px' }} justify="center">
                <Col span={15}>
                    <Card bordered={false} style={{ marginBottom: '24px' }}>
                        <BarcodeScanner onClick={onChangeBarcode} />
                    </Card>
                    <CustomForm />
                </Col>
            </Row>
        </div>
    );
};

export default CreateProduct;
