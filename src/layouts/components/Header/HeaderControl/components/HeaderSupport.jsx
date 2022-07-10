import React from 'react';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

const HeaderSupport = (props) => {
    return (
        <Tooltip title="Support">
            <Button shape="circle" type="primary" icon={<CustomerServiceOutlined />}></Button>
        </Tooltip>
    );
};

export default HeaderSupport;
