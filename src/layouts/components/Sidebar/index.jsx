import React, { useState, useEffect } from 'react';
import {
    AppstoreOutlined,
    ShopOutlined,
    CodeSandboxOutlined,
    TagOutlined,
    TagsOutlined,
    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons';
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
    getItem('Products', 'product', <CodeSandboxOutlined />, [
        getItem('Category', 'category', <TagOutlined />),
        getItem('Subcategory', 'subcategory', <TagsOutlined />),
    ]),
    getItem('Suppliers', 'supplier', <SolutionOutlined />),
    getItem('Customers', 'customer', <UserOutlined />),
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

    const logoStyle = {
        height: '32px',
        margin: '16px',
        background: 'rgba(255, 255, 255, 0.3)',
    };
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
            <div className="logo" style={logoStyle} />
            <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" items={items} onClick={onClickMenu} />
        </Sider>
    );
};

export default Sidebar;
