import React from 'react';
import { Layout, Row, Col } from 'antd';

import Breadcrumb from '../../../components/common/Breadcrumb';
import HeaderControl from './HeaderControl';

import HeaderSearch from './HeaderControl/HeaderSearch';

const { Header: AntHeader } = Layout;

const style = {
    background: '#fff',
};
const Header = (props) => {
    return (
        <AntHeader theme="light" style={style}>
            <Row gutter={[24, 0]} style={{ height: '100%' }} align={'middle'} justify={'space-around'}>
                <Col span={12} style={{ display: 'flex' }}>
                    <HeaderSearch />
                </Col>
                <Col span={12}>
                    <HeaderControl />
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;
