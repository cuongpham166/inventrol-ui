import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Skeleton, Result, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/common/Breadcrumb';

import CustomDataTable from 'components/common/CustomDataTable';

import * as service from '../../api/services';
import * as subcategoryProps from '../Subcategory/props';

import { useGetSubcategoriesQuery } from 'features/api/apiSlice';

const SubcategoryList = (props) => {
    let content;
    const { data: subcategories, isLoading, isSuccess, isError, error } = useGetSubcategoriesQuery();

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <CustomDataTable
                dataSource={subcategories}
                columns={subcategoryProps.subcategoryTableColumns}
                table="subcategory"
                dataUrl="subcategory"
                CustomFormItems={subcategoryProps.CustomFormMainItems}
                initialFormValues={subcategoryProps.initialFormValues}
                formType="subcategory"
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

export default SubcategoryList;
