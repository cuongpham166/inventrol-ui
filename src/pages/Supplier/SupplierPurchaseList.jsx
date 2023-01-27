import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Col, Row, Button, Card, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/common/Breadcrumb';

import useDataTable from '../../utils/hooks/useDataTable';

import * as service from '../../api/services';
import * as supplierProps from '../Supplier/props';

const { Title } = Typography;

const SupplierPurchaseList = (props) => {
    const { id } = useParams();
    const dataId = parseInt(id);

    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: supplierProps.supplierPurchaseTableColumns,
        table: 'product',
        dataUrl: 'supplier/' + dataId + '/purchases',
    });

    return (
        <>
            <Row>
                <Breadcrumb />
            </Row>

            <Row gutter={[24, 0]}>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="card_header">
                            <Title level={4}>Purchases</Title>
                        </div>
                        <div className="card_content">
                            <DataTable />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SupplierPurchaseList;
