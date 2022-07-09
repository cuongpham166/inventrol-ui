import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import useActionMenu from './useActionMenu';
import useToolbar from './useToolbar';

import * as service from '../../api/services';
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

const useDataTable = ({ columns, table }) => {
    const [dataSource, setDataSource] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const { deleteClick, actionMenuView } = useActionMenu({ selectedRow, table });
    const { searchValue, Toolbar } = useToolbar({ table });

    const updatedColumns = [
        ...columns,
        {
            title: 'Action',
            key: 'action',
            render: () => actionMenuView,
        },
    ];

    useEffect(() => {
        getAllData();
    }, []);

    useEffect(() => {
        if (selectedRow !== null) {
            const deletedElementId = selectedRow.id;
            const updatedSource = dataSource.filter((result) => result.id !== deletedElementId);
            setDataSource(updatedSource);
        }
    }, [deleteClick]);

    useEffect(() => {
        getSearchData(searchValue);
    }, [searchValue]);

    const getAllData = async () => {
        const result = await service.getAll(table);
        setDataSource(result);
    };

    const getSearchData = async (searchInput) => {
        const result = await service.search(table, searchInput);
        setDataSource(result);
    };

    const resetPagination = () => {
        setCurrentPage(DEFAULT_PAGE_NUMBER);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current - 1);
    };

    const DataTable = () => (
        <Table
            columns={updatedColumns}
            dataSource={dataSource}
            rowKey="id"
            onChange={handleTableChange}
            pagination={{
                pageSize: DEFAULT_PAGE_SIZE,
                current: currentPage + 1,
                total: dataSource.totalElements,
                showTotal: (total, range) => {
                    return `${range[0]}-${range[1]} of ${total} items`;
                },
            }}
            onRow={(record) => {
                return {
                    onClick: () => {
                        setSelectedRow(record);
                    },
                };
            }}
        />
    );

    return {
        DataTable,
        Toolbar,
        selectedRow,
        currentPage,
        pageSize,
        resetPagination,
    };
};

export default useDataTable;
