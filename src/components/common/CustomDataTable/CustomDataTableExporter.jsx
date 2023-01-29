import React from 'react';
import { Space, Button, Dropdown, Menu, Modal, Form } from 'antd';

import { FileTextOutlined, FilePdfOutlined, FileOutlined, CaretDownOutlined } from '@ant-design/icons';

const CustomDataTableExporter = (props) => {
    const items = [
        {
            label: 'Export as PDF',
            key: 'pdf',
            icon: <FilePdfOutlined />,
        },
        {
            label: 'Export as CSV',
            key: 'csv',
            icon: <FileTextOutlined />,
        },
        {
            label: 'Export as JSON',
            key: 'json',
            icon: <FileOutlined />,
        },
    ];

    const handleMenuClick = (e) => {};

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <Dropdown menu={menuProps} trigger={['click']}>
                <Button icon={<CaretDownOutlined />}>Export Data</Button>
            </Dropdown>
        </>
    );
};

export default CustomDataTableExporter;
