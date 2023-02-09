import React from 'react';
import { Col, Row, Card, Skeleton, Result } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';
import CustomDataTable from 'components/common/CustomDataTable';
import { useGetBrandsQuery } from 'features/api/apiSlice';
import * as brandProps from '../Brand/props';

const BrandList = (props) => {
    let content;
    const { data: brands, isLoading, isSuccess, isError, error } = useGetBrandsQuery();

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <CustomDataTable
                dataSource={brands}
                columns={brandProps.brandTableColumns}
                table="brand"
                dataUrl="brand"
                CustomFormItems={brandProps.CustomFormMainItems}
                initialFormValues={brandProps.initialFormValues}
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

export default BrandList;
