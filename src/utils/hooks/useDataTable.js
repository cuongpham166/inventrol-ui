import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Table, message, Row, Col, Space, Button, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import CheckBoxMenu from 'components/CheckboxMenu';

import useSearchbar from './useSearchbar';
import useExportData from './useExportData';

import * as service from '../../api/services';
import * as layoutConfig from '../../utils/config/layout';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

const useDataTable = ({ columns, table, dataUrl }) => {
    message.config(layoutConfig.message);

    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const [dataSource, setDataSource] = useState(null);
    const dataSourceRef = useRef(dataSource);

    const onDeleteElement = async (deletedElementId) => {
        let res = await service.deleteById(table, parseInt(deletedElementId));
        if (res.status == 200) {
            message.success('Sucess: Selected ' + table + ' has been deleted');
            let updatedData = dataSourceRef.current.filter((result) => result.id !== deletedElementId);
            dataSourceRef.current = updatedData;
            setDataSource(updatedData);
        }
    };

    const defaultColumns = [
        ...columns,
        {
            title: 'Action',
            dataIndex: 'name',
            key: 'action',
            width: '50px',
            align: 'center',
            render: (text, record) => (
                <Space>
                    <Link to={'/' + table + '/' + record.id + '/edit'}>
                        <Button type="primary" icon={<EditOutlined />}></Button>
                    </Link>
                    <Popconfirm
                        title="Are you sure to delete this element?"
                        onConfirm={() => {
                            onDeleteElement(record.id);
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const [tableColumns, setTableColumns] = useState(defaultColumns);
    const tableColumnsRef = useRef(tableColumns);

    const [columnOptionList, setColumnOptionList] = useState([]);
    const [columnValueList, setColumnValueList] = useState([]);

    const [totalElements, setTotalElements] = useState(0);

    const { Searchbar, searchValue } = useSearchbar({ table });
    const { DataExporter } = useExportData({ dataSource, table });

    const resetPagination = () => {
        setCurrentPage(DEFAULT_PAGE_NUMBER);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current - 1);
    };

    const getTableColumList = () => {
        let columnNameList = [];
        tableColumns.map((value, index) => {
            columnNameList.push(value.title);
        });
        setColumnOptionList(columnNameList);
        setColumnValueList(columnNameList);
    };

    const getAllData = async () => {
        const result = await service.getAll(dataUrl);
        dataSourceRef.current = result;
        setDataSource(result);
        setTotalElements(result.length);
    };

    useEffect(() => {
        getAllData();
        getTableColumList();
    }, []);

    const getSearchData = async (searchInput) => {
        const result = await service.search(table, searchInput);
        setDataSource(result);
    };

    useEffect(() => {
        if (searchValue != null) {
            getSearchData(searchValue);
        }
    }, [searchValue]);

    const onCheckboxChange = (selectedColums) => {
        if (selectedColums.length > tableColumns.length) {
            tableColumnsRef.current = defaultColumns;
            setTableColumns(defaultColumns);
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

    const DataTable = () => (
        <>
            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px' }}>
                <Col span={6}>
                    <Searchbar />
                </Col>
                <Col span={12}>
                    <Space style={{ float: 'right' }}>
                        <CheckBoxMenu options={columnOptionList} value={columnValueList} onChange={onCheckboxChange} />
                        <DataExporter />
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
                            total: totalElements,
                            showTotal: (total, range) => {
                                return `${range[0]}-${range[1]} of ${total} items`;
                            },
                        }}
                    />
                </Col>
            </Row>
        </>
    );

    return {
        DataTable,
        currentPage,
        pageSize,
        resetPagination,
    };
};

export default useDataTable;
