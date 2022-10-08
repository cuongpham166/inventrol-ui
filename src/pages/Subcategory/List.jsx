import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';

import useTopbar from 'utils/hooks/useTopbar';
import useDataTable from '../../utils/hooks/useDataTable';

import * as service from '../../api/services';

const SubcategoryList = (props) => {
    const [tableColumns, setTableColumns] = useState([]);
    const [dataTableSource, setDataTableSource] = useState([]);
    const { DataTable, Toolbar, selectedRow, currentPage, pageSize, resetPagination } = useDataTable({
        columns: tableColumns,
        table: 'subcategory',
        tableData: dataTableSource,
    });

    const { Topbar } = useTopbar({
        title: 'List of Subcategories',
        dataId: '',
        table: 'subcategory',
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
                    render: (text, record) => <Link to={'/category/' + text.id}>{text.name}</Link>,
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
                <Topbar />
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
