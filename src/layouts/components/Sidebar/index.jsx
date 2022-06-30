import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, ShopOutlined, CodeSandboxOutlined, TagOutlined, TagsOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const getItem = (label, key, icon, children) => {
    return {
        key,
        icon,
        children,
        label,
    };
};

const items = [
    getItem('Dashboard', 'dashboard', <AppstoreOutlined />),
    getItem('Inventory', 'inventory', <ShopOutlined />),
    getItem('Product Management', 'product management', <CodeSandboxOutlined />, [
        getItem('Category', 'category', <TagOutlined />),
        getItem('Subcategory', 'subcategory', <TagsOutlined />),
    ]),
];

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
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
                overflow: 'auto',
            }}
        >
            <Menu theme="light" selectedKeys={[selectedKey]} mode="inline" items={items} onClick={onClickMenu} />
        </Sider>
    );
};

export default Sidebar;
