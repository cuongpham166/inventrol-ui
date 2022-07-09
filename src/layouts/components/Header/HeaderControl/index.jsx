import React from 'react';
import { UserOutlined, NotificationFilled, CustomerServiceOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space, Button, Tooltip, Input, Select, Row } from 'antd';
const { Search } = Input;
const { Option } = Select;

const HeaderControl = (props) => {
    const onSearch = (value) => console.log(value);
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <span style={{ float: 'right' }}>
            <Space size={'large'}>
                <Search placeholder="input search text" style={{ display: 'block' }} onSearch={onSearch} enterButton />
                <Select
                    defaultValue="subcategory"
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                >
                    <Option value="subcategory">Subcategory</Option>
                    <Option value="category">Category</Option>
                </Select>

                <Tooltip title="Support">
                    <Button shape="circle" icon={<CustomerServiceOutlined />}></Button>
                </Tooltip>
                <Tooltip title="Settings">
                    <Button shape="circle" icon={<SettingOutlined />}></Button>
                </Tooltip>
                <Badge dot>
                    <Avatar icon={<NotificationFilled />} />
                </Badge>

                <Avatar icon={<UserOutlined />} />
            </Space>
        </span>
    );
};

export default HeaderControl;
