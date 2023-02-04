import React, { useState, useEffect, useRef } from 'react';
import { Table, message, Row, Col, Space, Button, Popconfirm, Dropdown } from 'antd';
import CustomModalNewForm from '../CustomModalNewForm';
import {
    CustomDataTableSortColumns,
    CustomDataTableDataFilter,
    CustomDataTableExporter,
    CustomDataTableColumnFilter,
    CustomDataTableSearchbar,
    CustomDataTableDisplay,
} from './CustomDataTableToolbar';

const CustomDataTable = ({ dataSource, columns, table, dataUrl, CustomFormItems, initialFormValues, formType }) => {
    const DEFAULT_PAGE_SIZE = 10;
    const DEFAULT_PAGE_NUMBER = 0;

    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const [tableColumns, setTableColumns] = useState(columns);
    const tableColumnsRef = useRef(tableColumns);

    const [columnOptionList, setColumnOptionList] = useState([]);
    const [columnValueList, setColumnValueList] = useState([]);

    const [sortableListItems, setsortableListItems] = useState([]);

    const [tableSize, setTableSize] = useState('large');

    const [dataTableSource, setDataTableSource] = useState(dataSource);

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
        setsortableListItems(columnNameList);
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

    const onTableDisplay = (value) => {
        setTableSize(value);
    };

    const onChangeTableColumns = () => {
        let sortableList = sortableListItems;
        let columnList = tableColumnsRef.current;

        columnList.sort((a, b) => {
            let eleA = a['title'];
            let eleB = b['title'];
            if (sortableList.indexOf(eleA) > sortableList.indexOf(eleB)) {
                return 1;
            } else {
                return -1;
            }
        });

        tableColumnsRef.current = [...columnList];
        setTableColumns([...columnList]);
    };

    const onChangeDataTableSource = (value) => {
        console.log('onChangeDataTableSource', value);
        setDataTableSource(value);
    };

    useEffect(() => {
        getTableColumnList();
    }, []);

    useEffect(() => {
        setDataTableSource(dataSource);
        //console.log('dataTableSource', dataTableSource);
    }, [dataSource]);

    return (
        <>
            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px' }}>
                <Col span={9}>
                    <CustomDataTableSearchbar onChange={onChangeDataTableSource} table={table} />
                </Col>
                <Col span={15}>
                    <Space style={{ float: 'right' }} size="small">
                        <CustomDataTableExporter />
                        <CustomDataTableDataFilter />
                        <CustomDataTableSortColumns
                            items={sortableListItems}
                            setListItems={setsortableListItems}
                            onChange={onChangeTableColumns}
                        />
                        <CustomDataTableColumnFilter
                            options={columnOptionList}
                            value={columnValueList}
                            onChange={onCheckboxChange}
                        />
                        <CustomDataTableDisplay onChange={onTableDisplay} />
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
                        dataSource={dataTableSource}
                        size={tableSize}
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
