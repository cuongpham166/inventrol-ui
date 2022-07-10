import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

const HeaderUser = (props) => {
    return (
        <Tooltip title="User">
            <Button shape="circle" type="primary" icon={<UserOutlined />}></Button>
        </Tooltip>
    );
};

export default HeaderUser;
