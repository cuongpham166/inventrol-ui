import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const useActionMenu = ({ selectedRow, updateEntity }) => {
    const navigate = useNavigate();
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
        switch (action.key) {
            case 'edit':
                navigate('/' + updateEntity + '/' + selectedRow.id + '/edit');
                break;
            case 'delete':
                console.log('delete');
                break;
            default:
                console.log('default');
                break;
        }
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
