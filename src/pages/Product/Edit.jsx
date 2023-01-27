import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Row, Col, Card, Typography, Space } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';
import BarcodeScanner from 'components/common/BarcodeScanner';

import useCustomForm from 'utils/hooks/useCustomForm';

import * as service from '../../api/services';
import * as productProps from '../Product/props';
const { Title } = Typography;
const EditProduct = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const [initialFormValues, setInitialFormValues] = useState({});

    const { CustomForm, form } = useCustomForm({
        table: 'product',
        initialFormValues: initialFormValues,
        CustomFormMainItems: productProps.CustomFormMainItems,
        formType: 'edit',
        dataId: dataId,
    });

    const getProductById = async (dataId) => {
        let result = await service.getById('product', dataId);
        let typeList = [];
        let supplierList = [];

        if (result.attributeValue.length > 0) {
            result.attributeValue.map((attrVal) => {
                typeList.push(attrVal.name);
            });
        }

        if (result.supplier.length > 0) {
            result.supplier.map((sup) => {
                supplierList.push(sup.name);
            });
        }
        setInitialFormValues({
            name: result.name,
            notice: result.notice,
            barcode: result.barcode,
            vat: result.vat,
            listingPrice: result.listingPrice,
            retailPrice: result.retailPrice,
            discount: result.discount.discountPercent,
            supplier: supplierList,
            attributeValue: typeList,

            brand: result.brand.name,
            subcategory: result.subcategory.name,
        });
    };

    const onChangeBarcode = (value) => {
        form.setFieldsValue({ barcode: value });
    };

    useEffect(() => {
        getProductById(dataId);
    }, []);

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

export default EditProduct;
