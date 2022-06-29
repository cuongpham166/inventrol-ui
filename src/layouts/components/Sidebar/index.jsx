import React, { useState } from 'react';
import { AppstoreOutlined, ShopOutlined, CodeSandboxOutlined, TagOutlined, TagsOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

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
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
                overflow: 'auto',
                height: '100vh',
            }}
        >
            <Menu theme="light" defaultSelectedKeys={['dashboard']} mode="inline" items={items} />
        </Sider>
    );
};

export default Sidebar;
