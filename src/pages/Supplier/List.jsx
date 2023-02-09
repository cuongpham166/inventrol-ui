import React from 'react';
import { Col, Row, Card, Skeleton, Result } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';
import CustomDataTable from 'components/common/CustomDataTable';
import * as supplierProps from '../Supplier/props';
import { useGetSuppliersQuery } from 'features/api/apiSlice';

const SupplierList = (props) => {
    let content;
    const { data: suppliers, isLoading, isSuccess, isError, error } = useGetSuppliersQuery();

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <CustomDataTable
                dataSource={suppliers}
                columns={supplierProps.supplierTableColumns}
                table="supplier"
                dataUrl="supplier"
                CustomFormItems={supplierProps.CustomFormMainItems}
                initialFormValues={supplierProps.initialFormValues}
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

export default SupplierList;
