import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row } from 'antd';

import useDataTable from '../../utils/hooks/useDataTable';
import useTopbar from 'utils/hooks/useTopbar';

import * as service from '../../api/services';

const columns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
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
        dataIndex: 'contactPerson',
        key: 'contactPerson',
    },
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
    },
    {
        title: 'Updated Date',
        dataIndex: 'updatedDate',
        key: 'updatedDate',
    },
    {
        title: 'Notice',
        dataIndex: 'notice',
        key: 'notice',
    },
];

const SupplierList = (props) => {
    const [dataTableSource, setDataTableSource] = useState([]);
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: columns,
        table: 'supplier',
        tableData: dataTableSource,
    });

    const { Topbar } = useTopbar({
        title: 'List of Suppliers',
        dataId: '',
        table: 'supplier',
    });

    const getAllData = async () => {
        const result = await service.getAll('supplier');
        const tableData = result.filter((element) => element.deleted === false);
        setDataTableSource(tableData);
    };

    useEffect(() => {
        getAllData();
    }, []);

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
