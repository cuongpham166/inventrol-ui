import React from 'react';
import { Layout, Row, Col } from 'antd';

import Breadcrumb from '../../../components/Breadcrumb';
import HeaderControl from './HeaderControl';
import HeaderClock from './HeaderClock';

const { Header: AntHeader } = Layout;

const style = {
    background: '#fff',
};
const Header = (props) => {
    return (
        <AntHeader theme="light" style={style}>
            <Row gutter={[24, 0]} style={{ height: '100%' }} align={'middle'} justify={'space-around'}>
                <Col span={24} md={6}>
                    <Breadcrumb />
                </Col>
                <Col span={24} md={4}>
                    <HeaderClock />
                </Col>
                <Col span={24} md={14}>
                    <HeaderControl />
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;
