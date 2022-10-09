import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Card, Popover, Tag } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import Breadcrumb from 'components/Breadcrumb';
import useDataTable from '../../utils/hooks/useDataTable';
import usePageHeader from 'utils/hooks/usePageHeader';

import * as service from '../../api/services';

const pageHeaderExtra = (
    <>
        <Link to={'/subcategory/add'}>
            <Button key="1" type="primary" icon={<PlusOutlined />} style={{ textTransform: 'capitalize' }}>
                Create New Subcategory
            </Button>
        </Link>
    </>
);

const SubcategoryList = (props) => {
    const [tableColumns, setTableColumns] = useState([]);
    const [dataTableSource, setDataTableSource] = useState([]);
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: tableColumns,
        table: 'subcategory',
        tableData: dataTableSource,
    });

    const { PageHeader } = usePageHeader({
        title: 'List of Subcategories',
        dataId: '',
        table: 'subcategory',
        pageHeaderExtra: pageHeaderExtra,
    });

    const getAllData = async () => {
        const result = await service.getAll('subcategory');
        const tableData = result.filter((element) => element.deleted === false);
        setDataTableSource(tableData);
    };

    useEffect(() => {
        getAllData();
    }, []);

    useEffect(() => {
        let ignore = false;
        const getAllCategories = async () => {
            //const result = await service.getAll('category');
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
                    render: (text, record) => <Link to={'/subcategory/' + record.id}>{text}</Link>,
                },
                {
                    title: 'Category',
                    dataIndex: 'category',
                    key: 'category',
                    render: (category) => (
                        <Link to={'/category/' + category.id}>
                            <Tag color={category.tagColor}>{category.name}</Tag>
                        </Link>
                    ),
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

            if (!ignore) {
                setTableColumns(columns);
            }
        };
        getAllCategories();
        return () => {
            ignore = true;
        };
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

export default SubcategoryList;
