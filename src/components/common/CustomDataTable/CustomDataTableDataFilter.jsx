import React from 'react';
import { Space, Button, Dropdown, Menu, Modal, Form, Tooltip } from 'antd';

import { FilterOutlined } from '@ant-design/icons';
const CustomDataTableDataFilter = (props) => {
    return (
        <>
            <Tooltip title="Filter Data">
                <Button icon={<FilterOutlined />}></Button>
            </Tooltip>
        </>
    );
};

export default CustomDataTableDataFilter;
