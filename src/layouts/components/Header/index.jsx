import React from 'react';
import { Layout, Row, Col } from 'antd';

import Breadcrumb from '../../../components/common/Breadcrumb';
import HeaderControl from './HeaderControl';
import HeaderClock from './HeaderClock';
import HeaderSearch from './HeaderControl/components/HeaderSearch';

const { Header: AntHeader } = Layout;

const style = {
    background: '#fff',
};
const Header = (props) => {
    return (
        <AntHeader theme="light" style={style}>
            <Row gutter={[24, 0]} style={{ height: '100%' }} align={'middle'} justify={'space-around'}>
                <Col span={24} md={11}>
                    <HeaderSearch />
                </Col>
                <Col span={24} md={13}>
                    <HeaderControl />
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;
