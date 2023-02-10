import React from 'react';
import { Col, Row, Skeleton, Result, Card } from 'antd';
import Breadcrumb from 'components/common/Breadcrumb';
import * as discountProps from '../Discount/props';

import { useGetDiscountsQuery } from 'features/api/apiSlice';
import CustomDataTable from 'components/common/CustomDataTable';

const DiscountList = (props) => {
    let content;
    const { data: discounts, isLoading, isSuccess, isError, error } = useGetDiscountsQuery();

    if (isLoading) {
        content = <Skeleton />;
    } else if (isSuccess) {
        content = (
            <CustomDataTable
                dataSource={discounts}
                columns={discountProps.discountTableColumns}
                table="discount"
                dataUrl="discount"
                CustomFormItems={[]}
                initialFormValues={[]}
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

export default DiscountList;
