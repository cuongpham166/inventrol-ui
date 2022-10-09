import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Col, Row, Button, Card, Popover, Tag } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';

import Breadcrumb from 'components/Breadcrumb';

import * as service from '../../api/services';

import useTopbar from 'utils/hooks/useTopbar';
import useDataTable from '../../utils/hooks/useDataTable';
import usePageHeader from 'utils/hooks/usePageHeader';

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
        render: (text, record) => <Link to={'/category/' + record.id}>{text}</Link>,
    },
    {
        title: 'Subcategories',
        dataIndex: 'subcategory',
        key: 'subcategory',
        render: (subcategory) => (
            <div>
                {subcategory.map((val) => {
                    return (
                        <Link to={'/subcategory/' + val.id} key={val.name}>
                            <Tag key={val.id} color={val.tagColor}>
                                {val.name}
                            </Tag>
                        </Link>
                    );
                })}
            </div>
        ),
    },
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: '120px',
    },
    {
        title: 'Updated Date',
        dataIndex: 'updatedDate',
        key: 'updatedDate',
        width: '130px',
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

const pageHeaderExtra = (
    <>
        <Link to={'/category/add'}>
            <Button key="1" type="primary" icon={<PlusOutlined />} style={{ textTransform: 'capitalize' }}>
                Create New Category
            </Button>
        </Link>
    </>
);

const CategoryList = (props) => {
    const [dataTableSource, setDataTableSource] = useState([]);
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: columns,
        table: 'category',
        tableData: dataTableSource,
    });

    const { PageHeader } = usePageHeader({
        title: 'List of Categories',
        dataId: '',
        table: 'category',
        pageHeaderExtra: pageHeaderExtra,
    });

    const getAllData = async () => {
        const result = await service.getAll('category');
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

export default CategoryList;
