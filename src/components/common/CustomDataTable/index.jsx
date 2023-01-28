import React, { useState, useEffect, useRef } from 'react';
import { Table, message, Row, Col, Space, Button, Popconfirm, Dropdown } from 'antd';
import CustomModalForm from '../CustomModalForm';
import DetailBrandModal from 'components/Brand/DetailBrandModal';
import { CaretDownOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import * as service from '../../../api/services';
import CustomActionMenu from '../CustomActionMenu';

const CustomDataTable = ({ dataSource, columns, table, dataUrl, CustomFormItems, initialFormValues, formType }) => {
    const DEFAULT_PAGE_SIZE = 10;
    const DEFAULT_PAGE_NUMBER = 0;

    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const handleMenuClick = (e) => {
        console.log('click', e);
    };

    const items = [
        {
            label: 'View',
            key: 'view',
            icon: <EyeOutlined />,
        },
        {
            label: 'Edit',
            key: 'edit',
            icon: <EditOutlined />,
        },
        {
            label: 'Delete',
            key: 'delete',
            icon: <DeleteOutlined />,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const resetPagination = () => {
        setCurrentPage(DEFAULT_PAGE_NUMBER);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current - 1);
    };

    return (
        <>
            <Row gutter={[64, 64]} justify="space-between" style={{ marginBottom: '20px' }}>
                <Col span={6}></Col>
                <Col span={18}>
                    <Space style={{ float: 'right' }}>
                        <CustomModalForm
                            CustomFormItems={CustomFormItems}
                            initialFormValues={initialFormValues}
                            table={table}
                            formType={formType}
                        />
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
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
                </Col>
            </Row>
        </>
    );
};

export default CustomDataTable;
