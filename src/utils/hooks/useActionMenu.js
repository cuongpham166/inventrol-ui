import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const useActionMenu = (selectedRow) => {
    const actionMenuItems = [
        {
            key: 'edit',
            label: 'Edit',
            icon: <EditOutlined />,
        },
        {
            key: 'delete',
            label: 'Delete',
            icon: <DeleteOutlined />,
        },
    ];

    const handleMenuClick = (action) => {
        console.log('handleMenuClick');
        console.log(selectedRow);
    };

    const actionMenu = <Menu onClick={handleMenuClick} items={actionMenuItems} />;

    const actionMenuView = (
        <span>
            <Dropdown overlay={actionMenu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <MoreOutlined style={{ fontSize: '25px' }} />
                </a>
            </Dropdown>
        </span>
    );

    return [actionMenuView];
};

export default useActionMenu;
