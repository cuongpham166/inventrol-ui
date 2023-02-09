import React from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';

const HeaderUser = (props) => {
    const handleMenuClick = (e) => {};

    const items = [
        {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />,
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Dropdown menu={menuProps} trigger={['click']}>
            <Button type="primary" icon={<UserOutlined />} size="large"></Button>
        </Dropdown>
    );
};

export default HeaderUser;
