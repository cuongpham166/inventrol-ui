import React from 'react';

import { Col, Row, Card, Skeleton, Result } from 'antd';

import Breadcrumb from 'components/common/Breadcrumb';

import CustomDataTable from 'components/common/CustomDataTable';

import * as attributeProps from '../Attribute/props';

import { useGetAttributesQuery } from 'features/api/apiSlice';
const AttributeList = (props) => {
    let content;
    const { data: attributes, isLoading, isSuccess, isError, error } = useGetAttributesQuery();

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <CustomDataTable
                dataSource={attributes}
                columns={attributeProps.attributeTableColumns}
                table="attribute"
                dataUrl="attribute"
                CustomFormItems={attributeProps.CustomFormMainItems}
                initialFormValues={attributeProps.initialFormValues}
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

export default AttributeList;
