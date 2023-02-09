import React from 'react';
import { Col, Row, Card, Skeleton, Result } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';
import * as customerProps from '../Customer/props';
import CustomDataTable from 'components/common/CustomDataTable';
import { useGetCustomersQuery } from 'features/api/apiSlice';

const CustomerList = (props) => {
    let content;
    const { data: customers, isLoading, isSuccess, isError, error } = useGetCustomersQuery();

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <CustomDataTable
                dataSource={customers}
                columns={customerProps.customerTableColumns}
                table="customer"
                dataUrl="customer"
                CustomFormItems={customerProps.CustomFormMainItems}
                initialFormValues={customerProps.initialFormValues}
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

export default CustomerList;
