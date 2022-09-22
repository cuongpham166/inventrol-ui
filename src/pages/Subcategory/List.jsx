import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';

import useTopbar from 'utils/hooks/useTopbar';
import useDataTable from '../../utils/hooks/useDataTable';

import * as service from '../../api/services';

const SubcategoryList = (props) => {
    const [tableColumns, setTableColumns] = useState([]);
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: tableColumns,
        table: 'subcategory',
    });

    const { Topbar } = useTopbar({
        title: 'List Of Subcategories',
        dataId: '',
        table: 'subcategory',
    });

    useEffect(() => {
        let ignore = false;
        const getAllCategories = async () => {
            const result = await service.getAll('category');
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
                    render: (text, record) => <Link to={'/subcategory/' + record.id}>{text}</Link>,
                },
                {
                    title: 'Category',
                    dataIndex: 'category_id',
                    key: 'category_id',
                    render: (text, record) => (
                        <Link to={'/category/' + text}>
                            {result.find((categoryName) => categoryName.id == text).name}
                        </Link>
                    ),
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

export default SubcategoryList;
