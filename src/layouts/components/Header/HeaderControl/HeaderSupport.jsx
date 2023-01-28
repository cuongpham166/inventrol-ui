import React from 'react';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

const HeaderSupport = (props) => {
    return (
        <Tooltip title="Support">
            <Button icon={<CustomerServiceOutlined />} className="header_button" size="large"></Button>
        </Tooltip>
    );
};

export default HeaderSupport;
