import React from 'react';
import { Col, Row, Card, Skeleton, Result } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';

import CustomDataTable from 'components/common/CustomDataTable';

import * as attributeValueProps from '../AttributeValue/props';
import { useGetAttributeValuesQuery } from 'features/api/apiSlice';

const AttributeValueList = (props) => {
    let content;
    const { data: attributeValues, isLoading, isSuccess, isError, error } = useGetAttributeValuesQuery();

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <CustomDataTable
                dataSource={attributeValues}
                columns={attributeValueProps.attributeValueTableColumns}
                table="attribute-value"
                dataUrl="attribute-value"
                CustomFormItems={attributeValueProps.CustomFormMainItems}
                initialFormValues={attributeValueProps.initialFormValues}
                formType="create"
            />
        );
    } else if (isError) {
        let errorStatus = `[${error.status}] - ${error.error}`;
        content = <Result status="warning" title={errorStatus} />;
    }

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="card_content">{content}</div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AttributeValueList;
