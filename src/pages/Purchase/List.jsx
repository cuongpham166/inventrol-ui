import React from 'react';
import { Col, Row, Card, Skeleton, Result } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';
import CustomDataTable from 'components/common/CustomDataTable';
import * as purchaseProps from '../Purchase/props';
import { useGetPurchasesQuery } from 'features/api/apiSlice';

const PurchaseList = (props) => {
    let content;
    const { data: purchases, isLoading, isSuccess, isError, error } = useGetPurchasesQuery();

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <CustomDataTable
                dataSource={purchases}
                columns={purchaseProps.purchaseTableColumns}
                table="purchase"
                dataUrl="purchase"
                CustomFormItems={<></>}
                initialFormValues={{}}
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

export default PurchaseList;
