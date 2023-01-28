import React, { useState } from 'react';
import { Popover, Tag, Button, Modal, Tooltip } from 'antd';
import { InfoOutlined } from '@ant-design/icons';

const NoticeModal = ({ data }) => {
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        <Popover content={data} title="Notice" trigger="click" open={open} onOpenChange={handleOpenChange}>
            <Button icon={<InfoOutlined />} size={'small'} shape="circle" type="primary"></Button>
        </Popover>
    );
};

export default NoticeModal;
