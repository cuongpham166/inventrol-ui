import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Col, Input, Button, Dropdown, Menu } from 'antd';
import { PlusOutlined, CaretDownOutlined } from '@ant-design/icons';

import { exportItems } from 'utils/config/layout';

const { Search } = Input;

const useToolbar = ({ table }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleMenuClick = (e) => {
        console.log('click', e);
    };

    const onSearch = (value) => {
        setSearchValue(value);
    };

    const menu = <Menu onClick={handleMenuClick} items={exportItems} />;

    const Toolbar = () => (
        <>
            <Col span={5}>
                <Search placeholder={'Search ' + table} onSearch={onSearch} enterButton />
            </Col>
            <Col span={12}>
                <Space style={{ float: 'right' }}>
                    <Dropdown overlay={menu}>
                        <Button>
                            <Space>
                                Export
                                <CaretDownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    <Link to={'/' + table + '/add'}>
                        <Button type="primary" icon={<PlusOutlined />}>
                            Add New
                        </Button>
                    </Link>
                </Space>
            </Col>
        </>
    );

    return { searchValue, Toolbar };
};

export default useToolbar;
