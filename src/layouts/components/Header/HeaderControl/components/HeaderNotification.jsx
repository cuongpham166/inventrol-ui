import React, { useState } from 'react';
import { NotificationOutlined, CheckOutlined, SettingOutlined } from '@ant-design/icons';
import { Badge, Button, Tooltip, Drawer, Avatar, Card } from 'antd';

const { Meta } = Card;

const HeaderNotification = (props) => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <span>
            <Tooltip title="Notification">
                <Badge dot>
                    <Button type="primary" shape="circle" onClick={showDrawer} icon={<NotificationOutlined />}></Button>
                </Badge>
            </Tooltip>
            <Drawer title="Notification" placement="right" onClose={onClose} visible={visible}>
                <Card
                    style={{
                        width: 300,
                    }}
                    actions={[<CheckOutlined key="check" />]}
                >
                    <Meta
                        avatar={<Avatar icon={<SettingOutlined />} />}
                        title="System"
                        description="This is notification from System"
                    />
                </Card>
            </Drawer>
        </span>
    );
};

export default HeaderNotification;
