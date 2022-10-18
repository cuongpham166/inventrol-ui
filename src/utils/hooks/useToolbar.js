import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Col, Input, Row } from 'antd';

import useExportData from './useExportData';
const { Search } = Input;

const useToolbar = ({ table, dataSource }) => {
    const [searchValue, setSearchValue] = useState(null);
    const { DataExporter } = useExportData({ dataSource });

    const onSearch = (value) => {
        setSearchValue(value);
    };

    const Toolbar = () => (
        <>
            <Col span={6}>
                <Row>
                    <Search placeholder={'Search ' + table} onSearch={onSearch} enterButton />
                </Row>
            </Col>
            <Col span={12}>
                <Space style={{ float: 'right' }}>
                    <DataExporter />
                </Space>
            </Col>
        </>
    );

    return { searchValue, Toolbar };
};

export default useToolbar;
