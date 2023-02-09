import React from 'react';

import { Col, Row, Card, Skeleton, Result } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';

import * as categoryProps from '../Category/props';

import CustomDataTable from 'components/common/CustomDataTable';
import { useGetCategoriesQuery } from 'features/api/apiSlice';

const CategoryList = (props) => {
    let content;
    const { data: categories, isLoading, isSuccess, isError, error } = useGetCategoriesQuery();

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <CustomDataTable
                dataSource={categories}
                columns={categoryProps.categoryTableColumns}
                table="category"
                dataUrl="category"
                CustomFormItems={categoryProps.CustomFormMainItems}
                initialFormValues={categoryProps.initialFormValues}
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

export default CategoryList;
