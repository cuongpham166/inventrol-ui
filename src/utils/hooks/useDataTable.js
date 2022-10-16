import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import useActionMenu from './useActionMenu';
import useToolbar from './useToolbar';

import * as service from '../../api/services';
import * as layoutConfig from '../../utils/config/layout';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

const useDataTable = ({ columns, table, dataUrl }) => {
    const [dataSource, setDataSource] = useState(null);
    const [totalElements, setTotalElements] = useState(0);

    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const { deleteClick, actionMenuView } = useActionMenu({ selectedRow, table });
    const { searchValue, Toolbar } = useToolbar({ table });

    message.config(layoutConfig.message);

    const updatedColumns = [
        ...columns,
        {
            title: 'Action',
            key: 'action',
            width: '50px',
            align: 'center',
            render: () => actionMenuView,
        },
    ];

    const resetPagination = () => {
        setCurrentPage(DEFAULT_PAGE_NUMBER);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current - 1);
    };

    useEffect(() => {
        if (selectedRow !== null) {
            const deletedElementId = selectedRow.id;
            const updatedSource = dataSource.filter((result) => result.id !== deletedElementId);
            setDataSource(updatedSource);
            //softDelete
            deleteElement(deletedElementId);
            //softDelete
        }
    }, [deleteClick]);

    const getAllData = async () => {
        const result = await service.getAll(dataUrl);
        setDataSource(result);
        setTotalElements(result.length);
    };

    useEffect(() => {
        getAllData();
    }, []);

    const deleteElement = async (elementId) => {
        const res = await service.deleteById(table, parseInt(elementId));
        if (res.status === 200) {
            message.success('Sucess: Selected ' + table + ' has been deleted');
            //notification success
        }
    };

    const getSearchData = async (searchInput) => {
        const result = await service.search(table, searchInput);
        setDataSource(result);
    };

    useEffect(() => {
        if (searchValue != null) {
            getSearchData(searchValue);
        }
    }, [searchValue]);

    const DataTable = () => (
        <Table
            columns={updatedColumns}
            dataSource={dataSource}
            rowKey="id"
            bordered
            onChange={handleTableChange}
            pagination={{
                pageSize: DEFAULT_PAGE_SIZE,
                current: currentPage + 1,
                total: totalElements,
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
