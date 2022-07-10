import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Tooltip, Drawer } from 'antd';

const HeaderSetting = (props) => {
    const [visibleDrawer, setVisibleDrawer] = useState(false);
    const [visibleTooltip, setVisibleTooltip] = useState();
    const showDrawer = () => {
        setVisibleDrawer(true);
        setVisibleTooltip(false);
    };

    const handleCloseDrawer = () => {
        setVisibleDrawer(false);
        setVisibleTooltip();
    };

    return (
        <span>
            <Tooltip title="Settings" visible={visibleTooltip}>
                <Button shape="circle" type="primary" icon={<SettingOutlined />} onClick={showDrawer}></Button>
            </Tooltip>
            <Drawer title="Configurator" placement="right" onClose={handleCloseDrawer} visible={visibleDrawer}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </span>
    );
};

export default HeaderSetting;
