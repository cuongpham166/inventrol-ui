import React from 'react';
import { Card, Space, Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { removeNotification } from 'features/notification/notificationSlice';
const { Text } = Typography;

const HeaderNotificationCard = (props) => {
    const dispatch = useDispatch();

    const removeNotificationHandle = (notificationId) => {
        dispatch(removeNotification(notificationId));
    };

    return (
        <>
            <Card
                style={{
                    width: 300,
                }}
                title={props.notificationType}
                extra={
                    <Button
                        icon={<CloseOutlined />}
                        onClick={() => removeNotificationHandle(props.notificationId)}
                        type="primary"
                        size="small"
                    />
                }
                size="small"
            >
                <Space direction="vertical">
                    <Text strong>{props.notificationText}</Text>
                    <Text type="secondary">{props.notificationTime}</Text>
                </Space>
            </Card>
        </>
    );
};

export default HeaderNotificationCard;
