import React from 'react';

import { Row, Col, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Topbar = (props) => {
    const title = props.topbar.title;
    const subtitle = props.topbar.subtitle;

    return (
        <Row justify="space-between">
            <Col span={8}>
                {title && (
                    <Title level={3} strong style={{ marginBottom: '0px' }}>
                        {title}
                    </Title>
                )}
                {subtitle && (
                    <Title level={5} style={{ marginTop: '0px', fontWeight: '300' }}>
                        {subtitle}
                    </Title>
                )}
            </Col>
            <Col span={12}></Col>
        </Row>
    );
};

export default Topbar;
