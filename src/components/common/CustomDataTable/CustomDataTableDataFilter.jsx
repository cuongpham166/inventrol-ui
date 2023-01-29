import React from 'react';
import { Space, Button, Dropdown, Menu, Modal, Form } from 'antd';

import { FilterOutlined } from '@ant-design/icons';
const CustomDataTableDataFilter = (props) => {
    return (
        <div>
            <Button icon={<FilterOutlined />}>Filter Data</Button>
        </div>
    );
};

export default CustomDataTableDataFilter;
