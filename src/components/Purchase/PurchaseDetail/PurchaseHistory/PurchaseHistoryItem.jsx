import React from 'react';
import { Card, Space, Timeline, Typography, Row } from 'antd';
import {
    ShoppingCartOutlined,
    CodeSandboxOutlined,
    CarryOutOutlined,
    HomeOutlined,
    DropboxOutlined,
    CheckCircleFilled,
} from '@ant-design/icons';
import * as dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const { Text, Title } = Typography;
const PurchaseHistoryItem = (props) => {
    let historyItem;
    let timelineIcon;
    switch (props.data.status) {
        case 'Purchase made':
            timelineIcon = <ShoppingCartOutlined className="timeline-icon" />;
            break;
        case 'Shipped':
            timelineIcon = <CodeSandboxOutlined className="timeline-icon" />;
            break;
        case 'Delivered':
            timelineIcon = <HomeOutlined className="timeline-icon" />;
            break;
        case 'Checking':
            timelineIcon = <DropboxOutlined className="timeline-icon" />;
            break;
        case 'Completed':
            timelineIcon = <CarryOutOutlined className="timeline-icon" />;
            break;
        default:
            timelineIcon = <></>;
            break;
    }

    if (props.data.createdOn == undefined) {
        historyItem = (
            <Timeline.Item color="#7A3DB8" dot={timelineIcon}>
                <Title level={5} className="timeline-title">
                    {props.data.status}
                </Title>
            </Timeline.Item>
        );
    } else {
        historyItem = (
            <Timeline.Item color="#7A3DB8" dot={timelineIcon}>
                <Row>
                    <Space>
                        <Title level={5} className="timeline-title">
                            {props.data.status}
                        </Title>
                        <CheckCircleFilled className="timeline-check" />
                    </Space>
                </Row>
                <Row>
                    <Text type="secondary" strong>
                        {dayjs(props.data.createdOn).format('DD/MM/YYYY')}
                    </Text>
                </Row>
            </Timeline.Item>
        );
    }
    return <>{historyItem}</>;
};

export default PurchaseHistoryItem;
