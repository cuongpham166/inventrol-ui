import React from 'react';
import { Col, Row, Card, Skeleton, Result } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';
import CustomDataTable from 'components/common/CustomDataTable';
import * as productProps from '../Product/props';
import { useGetProductsQuery } from 'features/api/apiSlice';

const ProductList = (props) => {
    let content;
    const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery();

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <CustomDataTable
                dataSource={products}
                columns={productProps.productTableColumns}
                table="product"
                dataUrl="product"
                CustomFormItems={productProps.CustomFormMainItems}
                initialFormValues={productProps.initialFormValues}
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
                        <div className="card_content">
                            <div className="card_content">{content}</div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductList;
