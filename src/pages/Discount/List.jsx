import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/common/Breadcrumb';

import useDataTable from '../../utils/hooks/useDataTable';

import * as discountProps from '../Discount/props';

const DiscountList = (props) => {
    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: discountProps.discountTableColumns,
        table: 'discount',
        dataUrl: 'discount',
    });

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="card_content">
                            <DataTable />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default DiscountList;
