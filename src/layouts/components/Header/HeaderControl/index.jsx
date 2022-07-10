import React from 'react';
import { Space } from 'antd';

import HeaderSearch from './components/HeaderSearch';
import HeaderSetting from './components/HeaderSetting';
import HeaderNotification from './components/HeaderNotification';
import HeaderSupport from './components/HeaderSupport';
import HeaderUser from './components/HeaderUser';
const HeaderControl = (props) => {
    return (
        <Space size={'middle'} style={{ float: 'right' }}>
            <Space size={'middle'}>
                <HeaderSearch />
                <HeaderSupport />
                <HeaderSetting />
                <HeaderNotification />
                <HeaderUser />
            </Space>
        </Space>
    );
};

export default HeaderControl;
