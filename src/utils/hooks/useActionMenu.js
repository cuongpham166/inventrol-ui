import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const useActionMenu = ({ selectedRow, table }) => {
    const navigate = useNavigate();
    const [deleteClick, setDeleteClick] = useState(true);
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
                navigate('/' + table + '/' + selectedRow.id + '/edit');
                break;
            case 'delete':
                setDeleteClick(deleteClick === true ? false : true);
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

    // return [actionMenuView];
    return {
        deleteClick,
        actionMenuView,
    };
};

export default useActionMenu;
