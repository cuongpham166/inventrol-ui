import React, { useState } from 'react';
import { Dropdown, Space, Menu, Popconfirm } from 'antd';
import { DownOutlined, QuestionCircleOutlined, MoreOutlined } from '@ant-design/icons';
import * as actionMenuProps from './props';

const ActionMenu = (props) => {
    const [visible, setVisible] = useState(false);

    const handleMenuClick = (action) => {
        if (action.key === 'delete') {
            setVisible(true);
        }
    };

    const handleConfirm = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const menu = <Menu onClick={handleMenuClick} items={actionMenuProps.actionMenuItems} />;

    return (
        <Popconfirm
            title="Are you sure to delete this task?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            visible={visible}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            okText="Delete"
            cancelText="Cancel"
        >
            <Dropdown overlay={menu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <MoreOutlined style={{ fontSize: '25px' }} />
                </a>
            </Dropdown>
        </Popconfirm>
    );
};

export default ActionMenu;
