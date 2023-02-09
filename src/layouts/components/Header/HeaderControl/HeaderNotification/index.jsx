import React, { useState, useEffect } from 'react';
import { NotificationOutlined, CheckOutlined, SettingOutlined } from '@ant-design/icons';
import { Badge, Button, Tooltip, Drawer, Avatar, Card, Space } from 'antd';
import HeaderNotificationCard from './HeaderNotificationCard';
import { useSelector } from 'react-redux';

const { Meta } = Card;

const HeaderNotification = (props) => {
    const [visible, setVisible] = useState(false);
    const [notidot, setNotidot] = useState(false);
    const [notiCount, setNotiCount] = useState(0);
    const notifications = useSelector((state) => state.notifications);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    useEffect(() => {
        notifications.length > 0 ? setNotidot(true) : setNotidot(false);
        setNotiCount(notifications.length);
    }, [notifications]);

    return (
        <span>
            <Tooltip title="Notification">
                <Badge count={notiCount} overflowCount={10}>
                    <Button onClick={showDrawer} icon={<NotificationOutlined />} size="large"></Button>
                </Badge>
            </Tooltip>
            <Drawer title="Notification" placement="right" onClose={onClose} open={visible}>
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        width: '100%',
                    }}
                >
                    {notifications.map((value, index) => {
                        return (
                            <HeaderNotificationCard
                                key={index}
                                notificationType="System"
                                notificationText={value.text}
                                notificationTime={value.time}
                                notificationId={value.id}
                            />
                        );
                    })}
                </Space>
            </Drawer>
        </span>
    );
};

export default HeaderNotification;
