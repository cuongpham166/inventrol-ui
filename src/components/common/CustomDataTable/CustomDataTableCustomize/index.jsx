import React, { useState, useEffect, useRef } from 'react';
import { Space, Button, Dropdown, Menu, Modal, Form, Tooltip } from 'antd';
import { EyeOutlined, ColumnHeightOutlined, DragOutlined } from '@ant-design/icons';

import { ToolOutlined } from '@ant-design/icons';
const CustomDataTableCustomize = (props) => {
    const items = [
        {
            label: 'Show/hide columns',
            key: 'hideColums',
            icon: <EyeOutlined />,
        },
        {
            label: 'Sort columns',
            key: 'sortColums',
            icon: <DragOutlined />,
        },
        {
            label: 'Comfort display',
            key: 'edit',
            icon: <ColumnHeightOutlined />,
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
                <Tooltip title="Customize Table">
                    <Button icon={<ToolOutlined />}></Button>
                </Tooltip>
            </Dropdown>
        </>
    );
};

export default CustomDataTableCustomize;
