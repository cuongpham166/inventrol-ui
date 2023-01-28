import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import { sidebarItems } from 'utils/config/layout';

const { Sider } = Layout;

const Sidebar = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const currentPath = location.pathname;
    const currentKeyMenu = currentPath.split('/')[1];
    let selectedKeyValue = 'dashboard';
    if (currentKeyMenu != '') {
        selectedKeyValue = currentKeyMenu;
    }
    const [selectedKey, setSelectedKey] = useState(selectedKeyValue);

    const onClickMenu = (item) => {
        let pathName = item.key;
        pathName === 'dashboard' ? navigate('/') : navigate('/' + pathName);
    };

    useEffect(() => {
        setSelectedKey(selectedKeyValue);
    }, [location]);

    return (
        <Sider
            theme="dark"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
                overflow: 'auto',
            }}
        >
            <Menu
                theme="dark"
                selectedKeys={[selectedKey]}
                mode="vertical"
                items={sidebarItems}
                onClick={onClickMenu}
                style={{ marginTop: '40px' }}
            />
        </Sider>
    );
};

export default Sidebar;
