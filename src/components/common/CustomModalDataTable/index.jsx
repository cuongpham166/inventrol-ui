import React, { useState, useEffect, useRef } from 'react';
import { Table, message, Row, Col, Space, Button, Popconfirm, Dropdown } from 'antd';

const CustomModalDataTable = ({ dataSource, columns }) => {
    const DEFAULT_PAGE_SIZE = 10;
    const DEFAULT_PAGE_NUMBER = 0;

    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current - 1);
    };

    return (
        <>
            <Table
                columns={columns}
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
        </>
    );
};

export default CustomModalDataTable;
