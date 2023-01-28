import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

const HeaderUser = (props) => {
    return (
        <Tooltip title="User">
            <Button type="primary" icon={<UserOutlined />} size="large"></Button>
        </Tooltip>
    );
};

export default HeaderUser;
