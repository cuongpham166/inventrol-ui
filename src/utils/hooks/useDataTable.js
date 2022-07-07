import React, { useState } from 'react';
import { Table } from 'antd';
import useActionMenu from './useActionMenu';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

const useDataTable = ({ columns, dataSource, updateEntity }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const [actionMenuView] = useActionMenu({ selectedRow, updateEntity });

    const updatedColumns = [
        ...columns,
        {
            title: 'Action',
            key: 'action',
            render: () => actionMenuView,
        },
    ];

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
        selectedRow,
        currentPage,
        pageSize,
        resetPagination,
    };
};

export default useDataTable;
