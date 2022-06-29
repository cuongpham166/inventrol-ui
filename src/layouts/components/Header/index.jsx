import React from 'react';
import { Layout } from 'antd';
const { Header: AntHeader } = Layout;
const logoStyle = {
    float: 'left',
    width: '120px',
    height: '31px',
    margin: ' 16px 24px 16px 0',
    background: 'rgba(255, 255, 255, 0.3)',
};
const Header = (props) => {
    return (
        <AntHeader theme="light">
            <div className="logo" style={{ logoStyle }} />
        </AntHeader>
    );
};

export default Header;
