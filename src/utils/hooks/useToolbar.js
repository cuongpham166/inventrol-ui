import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Col, Input, Button, Dropdown, Menu, Tooltip, Row } from 'antd';
import { PlusOutlined, CaretDownOutlined, CloseOutlined } from '@ant-design/icons';

import { exportItems } from 'utils/config/layout';

const { Search } = Input;

const useToolbar = ({ table }) => {
    const [searchValue, setSearchValue] = useState(null);

    const handleMenuClick = (e) => {
        //console.log('click', e);
    };

    const onSearch = (value) => {
        setSearchValue(value);
    };

    const menu = <Menu onClick={handleMenuClick} items={exportItems} />;

    const Toolbar = () => (
        <>
            <Col span={6}>
                <Row>
                    <Search placeholder={'Search ' + table} onSearch={onSearch} enterButton />
                </Row>
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
                    {/*                    <Link to={'/' + table + '/add'}>
                        <Button type="primary" icon={<PlusOutlined />} style={{ textTransform: 'capitalize' }}>
                            Create New {table}
                        </Button>
    </Link>*/}
                </Space>
            </Col>
        </>
    );

    return { searchValue, Toolbar };
};

export default useToolbar;
