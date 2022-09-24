import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row } from 'antd';

import useDataTable from '../../utils/hooks/useDataTable';
import useTopbar from 'utils/hooks/useTopbar';

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
        render: (text, record) => <Link to={'/supplier/' + record.id}>{text}</Link>,
    },
    {
        title: 'Contact Person',
        dataIndex: 'contact_person',
        key: 'contact_person',
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

const SupplierList = (props) => {
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: columns,
        table: 'supplier',
    });

    const { Topbar } = useTopbar({
        title: 'List Of Suppliers',
        dataId: '',
        table: 'subcategory',
    });

    return (
        <>
            <Topbar />
            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px', marginTop: '10px' }}>
                <Toolbar />
            </Row>

            <Row gutter={[16, 16]}>
                <DataTable />
            </Row>
        </>
    );
};

export default SupplierList;
