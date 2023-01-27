import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/common/Breadcrumb';

import * as service from '../../api/services';
import * as categoryProps from '../Category/props';

import useDataTable from '../../utils/hooks/useDataTable';

const CategoryList = (props) => {
    const { DataTable, currentPage, pageSize, resetPagination } = useDataTable({
        columns: categoryProps.categoryTableColumns,
        table: 'category',
        dataUrl: 'category',
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

export default CategoryList;
