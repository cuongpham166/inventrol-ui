import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row } from 'antd';

import * as service from '../../api/services';

import useTopbar from 'utils/hooks/useTopbar';
import useDataTable from '../../utils/hooks/useDataTable';

const columns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        width: 60,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={'/category/' + record.id}>{text}</Link>,
    },
    {
        title: 'Created Date',
        dataIndex: 'created_date',
        key: 'created_date',
    },
    {
        title: 'Updated Date',
        dataIndex: 'updated_date',
        key: 'updated_date',
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
    },
];

const CategoryList = (props) => {
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: columns,
        table: 'category',
    });

    const { Topbar } = useTopbar({
        title: 'List Of Categories',
        dataId: '',
        table: 'category',
    });

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Topbar />
                </Col>
            </Row>
            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px', marginTop: '10px' }}>
                <Toolbar />
            </Row>

            <Row gutter={[16, 16]}>
                <DataTable />
            </Row>
        </>
    );
};

export default CategoryList;
