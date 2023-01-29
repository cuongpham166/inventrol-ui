import React, { useState } from 'react';
import { Popover, Tag, Button, Modal, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const NoticePopover = ({ data }) => {
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        <Popover content={data} title="Notice" trigger="click" open={open} onOpenChange={handleOpenChange}>
            <QuestionCircleOutlined />
        </Popover>
    );
};

export default NoticePopover;
