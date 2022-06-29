import React from 'react';

import { Row, Col, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Topbar = (props) => {
    const title = props.toolbarData.title;
    const subtitle = props.toolbarData.subtitle;
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
                        {props.toolbarData.subtitle}
                    </Title>
                )}
            </Col>
            <Col span={12}>
                <Button type="primary" icon={<PlusOutlined />} style={{ float: 'right' }}>
                    {props.toolbarData.buttonText}
                </Button>
            </Col>
        </Row>
    );
};

export default Topbar;
