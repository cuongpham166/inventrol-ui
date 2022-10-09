import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card, Popover } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/Breadcrumb';

import useDataTable from '../../utils/hooks/useDataTable';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as service from '../../api/services';

const pageHeaderExtra = (
    <>
        <Link to={'/supplier/add'}>
            <Button key="1" type="primary" icon={<PlusOutlined />} style={{ textTransform: 'capitalize' }}>
                Create New Supplier
            </Button>
        </Link>
    </>
);

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
        width: '50px',
        align: 'center',
        render: (notice) => (
            <Popover content={notice} title="Notice" placement="bottom">
                <EyeOutlined />
            </Popover>
        ),
    },
];

const SupplierList = (props) => {
    const [dataTableSource, setDataTableSource] = useState([]);
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: columns,
        table: 'supplier',
        tableData: dataTableSource,
    });

    const { PageHeader } = usePageHeader({
        title: 'List of Suppliers',
        dataId: '',
        table: 'supplier',
        pageHeaderExtra: pageHeaderExtra,
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
            <Row>
                <Breadcrumb />
            </Row>
            <Row>
                <PageHeader />
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card bordered={false}>
                        <div className="card_content">
                            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px' }}>
                                <Toolbar />
                            </Row>
                            <DataTable />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SupplierList;
