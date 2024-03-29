import React from 'react';
import { Space } from 'antd';

import HeaderNotification from './HeaderNotification';

import HeaderUser from './HeaderUser';

import '../../../../assets/styles/header.less';

const HeaderControl = (props) => {
    return (
        <Space size={'middle'} style={{ float: 'right' }}>
            <Space size={'middle'}>
                <HeaderNotification />
                <HeaderUser />
            </Space>
        </Space>
    );
};

export default HeaderControl;
