import React from 'react';
import { Space, Button, Dropdown, Menu, Modal, Form, Tooltip } from 'antd';

import { ColumnHeightOutlined } from '@ant-design/icons';

const CustomDataTableDisplay = (props) => {
    const items = [
        {
            label: 'Small',
            key: 'small',
        },
        {
            label: 'Middle',
            key: 'middle',
        },
        {
            label: 'Large',
            key: 'large',
        },
    ];

    const handleMenuClick = (e) => {
        return props.onChange(e.key);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <Tooltip title="Comfort display">
                <Dropdown menu={menuProps} trigger={['click']}>
                    <Button icon={<ColumnHeightOutlined />}></Button>
                </Dropdown>
            </Tooltip>
        </>
    );
};

export default CustomDataTableDisplay;
