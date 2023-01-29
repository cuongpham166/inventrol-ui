import React, { useState, useEffect, useRef } from 'react';
import { Table, message, Row, Col, Space, Button, Popconfirm, Dropdown } from 'antd';
import CustomModalNewForm from '../CustomModalNewForm';

import CustomerDataTableColumnFilter from './CustomDataTableColumnFilter';
import CustomDataTableExporter from './CustomDataTableExporter';

import CustomDataTableDataFilter from './CustomDataTableDataFilter';
import CustomDataTableSearchBar from './CustomDataTableSearchBar';

import CustomDataTableCustomize from './CustomDataTableCustomize';
const CustomDataTable = ({ dataSource, columns, table, dataUrl, CustomFormItems, initialFormValues, formType }) => {
    const DEFAULT_PAGE_SIZE = 10;
    const DEFAULT_PAGE_NUMBER = 0;

    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const [tableColumns, setTableColumns] = useState(columns);
    const tableColumnsRef = useRef(tableColumns);

    const [columnOptionList, setColumnOptionList] = useState([]);
    const [columnValueList, setColumnValueList] = useState([]);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current - 1);
    };

    const getTableColumnList = () => {
        let columnNameList = [];
        tableColumns.map((value, index) => {
            columnNameList.push(value.title);
        });
        setColumnOptionList(columnNameList);
        setColumnValueList(columnNameList);
    };

    const onCheckboxChange = (selectedColums) => {
        if (selectedColums.length > tableColumns.length) {
            tableColumnsRef.current = columns;
            setTableColumns(columns);
        }
        let columnListFiltered = tableColumnsRef.current.filter((colVal) => {
            return selectedColums.find((element) => {
                return element === colVal.title;
            });
        });
        tableColumnsRef.current = columnListFiltered;
        setTableColumns(columnListFiltered);
        setColumnValueList(selectedColums);
    };

    useEffect(() => {
        getTableColumnList();
    }, []);

    return (
        <>
            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px' }}>
                <Col span={9}>
                    <CustomDataTableSearchBar />
                </Col>
                <Col span={15}>
                    <Space style={{ float: 'right' }} size="middle">
                        <CustomDataTableExporter />
                        <CustomDataTableDataFilter />
                        {/*<CustomerDataTableColumnFilter
                            options={columnOptionList}
                            value={columnValueList}
                            onChange={onCheckboxChange}
                        />*/}
                        <CustomDataTableCustomize />
                        <CustomModalNewForm
                            CustomFormItems={CustomFormItems}
                            initialFormValues={initialFormValues}
                            table={table}
                        />
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        columns={tableColumnsRef.current}
                        dataSource={dataSource}
                        rowKey="id"
                        bordered
                        onChange={handleTableChange}
                        pagination={{
                            pageSize: DEFAULT_PAGE_SIZE,
                            current: currentPage + 1,

                            showTotal: (total, range) => {
                                return `${range[0]}-${range[1]} of ${total} items`;
                            },
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default CustomDataTable;
